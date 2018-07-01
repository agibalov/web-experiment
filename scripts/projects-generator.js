hexo.extend.generator.register('project', locals => {
	var projects = locals.data.projects;

	var routes = [];
	for(projectKey in projects) {
		const project = projects[projectKey];
		routes.push({
			path: `projects/${projectKey}/index.html`,
			data: {
				project: project
			},
			layout: 'project'
		});
	}

	routes.push({
		path: `projects/index.html`,
		data: {
		    projects: projects
        },
		layout: 'projects'
	});

	return routes;
});
