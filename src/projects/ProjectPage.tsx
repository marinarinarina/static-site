import React, { useEffect, useState } from 'react';
import { projectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from './Project';
import { useParams } from 'react-router-dom';
import { ensureError } from '../utils';

function ProjectPage() {
	const [loading, setLoading] = useState(false);
	const [project, setProject] = useState<Project | null>(null);
	const [error, setError] = useState<string | null>(null);
	const params = useParams();
	const id = Number(params.id);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const data = await projectAPI.find(id);
				setError('');
				setProject(data);
			} catch (e: unknown) {
				const error = ensureError(e);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	return (
		<div>
			<h1>Project Detail</h1>
			{loading && (
				<div className="center-page">
					<span className="spinner primary"></span>
					<p>Loading...</p>
				</div>
			)}
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
			{project && <ProjectDetail project={project} />}
		</div>
	);
}

export default ProjectPage;
