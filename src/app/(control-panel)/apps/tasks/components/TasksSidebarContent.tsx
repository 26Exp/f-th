type TasksSidebarContentProps = {
	children: React.ReactNode;
};

/**
 * The tasks sidebar content.
 */
function TasksSidebarContent(props: TasksSidebarContentProps) {
	const { children } = props;
	return <div className="flex flex-col flex-auto">{children}</div>;
}

export default TasksSidebarContent;
