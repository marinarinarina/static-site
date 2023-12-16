import React, { SyntheticEvent, ChangeEvent, useState } from 'react'; // React.SyntheticEvent: 모든 이벤트의 기본타입
import { Project } from './Project';

interface ProjectFormProps {
	project: Project;
	onSave: (project: Project) => void;
	onCancel: () => void;
	onRemove: (project: Project) => void;
}

interface ProjectFormError {
	name: string;
	description: string;
	budget: string;
}

function ProjectForm({ project: initialProject, onSave, onCancel, onRemove }: ProjectFormProps) {
	const [project, setProject] = useState(initialProject);
	const [errors, setErrors] = useState<ProjectFormError>({
		name: '',
		description: '',
		budget: '',
	});

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		if (!isValid()) return;
		onSave(project);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
		const { type, name, value, checked } = event.target;
		let updatedValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
		const change = {
			[name]: updatedValue,
		};

		let updatedProject: Project;
		setProject((p) => {
			updatedProject = new Project({ ...p, ...change });
			return updatedProject;
		});
		setErrors(() => validate(updatedProject));
	};

	const handleDelete = () => {
		console.log(project.id);
		onRemove(project);
	};

	function validate(project: Project) {
		let errors: ProjectFormError = { name: '', description: '', budget: '' };
		if (project.name.length === 0) {
			errors.name = 'Name is required';
		}
		if (project.name.length > 0 && project.name.length < 3) {
			errors.name = 'Name needs to be at least 3 characters.';
		}
		if (project.description.length === 0) {
			errors.description = 'Description is required.';
		}
		if (project.budget === 0) {
			errors.budget = 'Budget must be more than $0.';
		}
		return errors;
	}

	function isValid(): boolean {
		return errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0;
	}

	return (
		<form className="input-group vertical" onSubmit={handleSubmit}>
			<label htmlFor="name">Project Name</label>
			<input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
			{errors.name.length > 0 && (
				<div className="card error">
					<p>{errors.name}</p>
				</div>
			)}
			<label htmlFor="description">Project Description</label>
			<textarea
				name="description"
				placeholder="enter description"
				value={project.description}
				onChange={handleChange}
			></textarea>
			{errors.description.length > 0 && (
				<div className="card error">
					<p>{errors.description}</p>
				</div>
			)}
			<label htmlFor="budget">Project Budget</label>
			<input
				type="number"
				name="budget"
				placeholder="enter budget"
				min={0}
				value={project.budget}
				onChange={handleChange}
			/>
			{errors.budget.length > 0 && (
				<div className="card error">
					<p>{errors.budget}</p>
				</div>
			)}
			<label htmlFor="isActive">Active?</label>
			<input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
			<div className="input-group">
				<button className="primary bordered medium">Save</button>
				<span />
				<button type="button" className="bordered medium" onClick={onCancel}>
					cancel
				</button>
				<button type="button" className="secondary bordered medium" onClick={handleDelete}>
					delete
				</button>
			</div>
		</form>
	);
}

export default ProjectForm;
