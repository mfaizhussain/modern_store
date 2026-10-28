export default function Icon(props) {
  var children = props.children;
  var className = props.className;

  // Set default className if not provided
  if (className === undefined) {
    className = '';
  }

  var fullClassName = 'material-symbols-outlined ' + className;

  return <span className={fullClassName}>{children}</span>;
}
