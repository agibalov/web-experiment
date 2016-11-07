hexo.extend.generator.register('project', function(locals) {
	var projects = locals.data.projects;

	var routes = [];
	for(projectKey in projects) {
		const project = projects[projectKey];
		routes.push({
			path: `projects/project-${projectKey}.html`,
			data: { content: `Data for ${projectKey} (${project.name}): ${project.description}` },
			layout: 'post'
		});
	}

	var content = '';
	for(projectKey in projects) {
		content += `<a href="/hexo-experiment/projects/project-${projectKey}.html">${projectKey}</a>, `;
	}
	routes.push({
		path: `projects/index.html`,
		data: { content: content },
		layout: 'post'
	});

	return routes;
});
