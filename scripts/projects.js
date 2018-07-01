const hfm = require('hexo-front-matter');
const util = require('hexo-util');

hexo.extend.processor.register('projects/:fileName', async file => {
    const content = hfm(await file.read());
    const data = {
        ...content,
        content: await hexo.render.render({
            text: content._content,
            engine: 'markdown'
        }),
        fileName: file.params.fileName,
        path: file.params['0'],
        slug: util.slugize(content.name)
    };

    const Project = hexo.model('Project');
    hexo.locals.set('projects', () => Project.find({}));

    const existing = Project.findOne({
        fileName: data.fileName
    });
    if(existing) {
        existing.replace(data);
        return;
    }

    Project.insert(data);
});

hexo.extend.generator.register('projects', locals => {
    return {
        path: `projects/index.html`,
        layout: `projects`,
        data: {
            projects: locals.projects
        }
    };
});

hexo.extend.generator.register('project', locals => {
    return locals.projects.map(project => {
        return {
            path: `projects/${project.slug}/index.html`,
            layout: `project`,
            data: {
                project: project,
                posts: locals.posts.find({
                    'project': project['post-reference']
                })
            }
        };
    });
});
