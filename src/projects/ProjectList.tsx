import React, { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
	projects: Project[];
	onSave: (project: Project) => void;
	onRemove: (project: Project) => void;
}

function ProjectList({ projects, onSave, onRemove }: ProjectListProps) {
	const [projectBeingEdited, setProjectBeingEdited] = useState({});

	const handleEdit = (project: Project) => {
		setProjectBeingEdited(project);
	};

	const cancelEditing = () => {
		setProjectBeingEdited({});
	};

	const items = projects.map((project) => (
		<div key={project.id} className="cols-sm">
			{projectBeingEdited === project ? (
				<ProjectForm onSave={onSave} onCancel={cancelEditing} onRemove={onRemove} project={project} />
			) : (
				<ProjectCard project={project} onEdit={handleEdit} />
			)}
		</div>
	));

	return <div className="row">{items}</div>;
}

export default ProjectList;
