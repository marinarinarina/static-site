import React, { Fragment, useState, useEffect } from 'react';
import { projectAPI } from './projectAPI';
import ProjectList from './ProjectList';
import { Project } from './Project';
import { ensureError } from '../utils';

function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		async function loadProjects() {
			setLoading(true);
			try {
				const data = await projectAPI.get(currentPage);
				setError('');
				if (currentPage === 1) {
					setProjects(data);
				} else {
					setProjects((projects) => [...projects, ...data]);
				}
			} catch (e: unknown) {
				const error = ensureError(e);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		loadProjects();
	}, [currentPage]);

	const handleMoreClick = () => {
		setCurrentPage((currentPage) => currentPage + 1);
	};

	const saveProject = (project: Project) => {
		async function addProject(project: Project) {
			try {
				const updatedProject = await projectAPI.put(project);
				const updatedProjects = projects.map((p: Project) => {
					return p.id === project.id ? new Project(updatedProject) : p;
				});
				setProjects(updatedProjects);
			} catch (e: unknown) {
				const error = ensureError(e);
				setError(error.message);
			}
		}
		addProject(project);
	};

	const removeProject = (project: Project) => {
		async function removeThisProject(project: Project) {
			try {
				await projectAPI.delete(project.id as number);
				const filteredProjects = projects.filter((p: Project) => p.id !== project.id);
				setProjects(filteredProjects);
			} catch (e: unknown) {
				const error = ensureError(e);
				setError(error.message);
			}
		}
		removeThisProject(project);
	};

	return (
		<Fragment>
			<h1>Projects</h1>
			{error && (
				<div className="row">
					<div className="card large error">
						<section>
							<p>
								<span className="icon-alert inverse "></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}
			<ProjectList projects={projects} onSave={saveProject} onRemove={removeProject} />
			{!loading && !error && (
				<div className="row">
					<div className="col-sm-12">
						<div className="button-group fluid">
							<button className="button default" onClick={handleMoreClick}>
								More...
							</button>
						</div>
					</div>
				</div>
			)}
			{loading && (
				<div className="center-page">
					<span className="spinner primary"></span>
					<p>Loading...</p>
				</div>
			)}
		</Fragment>
	);
}

export default ProjectsPage;
