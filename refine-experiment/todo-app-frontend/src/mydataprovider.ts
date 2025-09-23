import type { CrudSort, DataProvider } from "@refinedev/core";
import { DocumentNode, getOperationAST } from "graphql";
import type { Client } from "urql";

type GqlMeta = {
    document: DocumentNode;
    operationName?: string;
    variables?: any | ((p: any) => any);
};

const exec = async (client: Client, doc: DocumentNode, variables: any = {}) => {
  const op = getOperationAST(doc);
  if (!op) throw new Error("Invalid GraphQL document");
  if (op.operation === "mutation") {
    const res = await client.mutation(doc, variables).toPromise();
    if (res.error) throw res.error;
    return res.data;
  } else {
    const res = await client.query(doc, variables, { requestPolicy: "network-only" }).toPromise();
    if (res.error) throw res.error;
    return res.data;
  }
};

const listVars = (p: any) => ({
    where: p.filters ?? undefined,
    sort: p.sorters?.map((s: CrudSort) => ({ field: s.field, order: s.order === 'asc' ? 'ASC' : 'DESC'})) ?? undefined,
    skip: ((p.pagination?.currentPage ?? 1) - 1) * (p.pagination?.pageSize ?? 10),
    take: p.pagination?.pageSize ?? 10,
});

export const myDataProvider = (client: Client): DataProvider => ({
    getApiUrl: () => "not used",

    async getList({ resource, pagination, sorters, filters, meta }) {        
        const data = await exec(client, (meta as GqlMeta).document, listVars({ pagination, sorters, filters }));
        const key = (meta as any)?.root ?? resource;
        const box = (data as any)[key];
        return { data: box.items, total: box.total };
    },

    async getOne({ resource, id, meta }) {
        const vars =
            typeof meta?.variables === "function"
            ? meta.variables({ id })
            : meta?.variables ?? { id };

        const data = await exec(client, (meta as GqlMeta).document, vars);
        const key = (meta as any)?.root ?? resource.replace(/s$/, "");
        return { data: (data as any)[key] };
    },

    async create({ resource, variables, meta }) {
        const vars = { input: variables };
        const data = await exec(client, (meta as GqlMeta).document, vars);
        const key = (meta as any)?.root ?? "create" + resource.replace(/s$/, "").replace(/^./, c => c.toUpperCase());
        return { data: (data as any)[key] };
    },

    async update({ resource, id, variables, meta }) {
        const m = meta as GqlMeta | undefined;
        if (!m?.document) throw new Error("mutation document required");

        const computed =
            typeof m.variables === "function"
                ? m.variables(variables, { id, resource, meta })
                : m?.variables ?? { id, input: variables };

        const data = await exec(client, m.document, computed);
        const key = (meta as any)?.root ?? "update" + resource.replace(/s$/, "").replace(/^./, c => c.toUpperCase());

        return { data: key ? data[key] : data };
    },

    async deleteOne({ resource, id, meta }) {
        const data = await exec(client, (meta as GqlMeta).document, { id });
        const key = (meta as any)?.root ?? "delete" + resource.replace(/s$/, "").replace(/^./, c => c.toUpperCase());
        return { data: (data as any)[key] };
    },

    getMany: async () => ({ data: [] }),
    createMany: async () => ({ data: [] }),
    updateMany: async () => ({ data: [] }),
    deleteMany: async () => ({ data: [] }),
});
