import { Link } from 'react-router-dom';

const EmptyState = ({ icon, title, description, actionText, actionTo, onAction }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-description">{description}</p>
      {actionTo ? (
        <Link to={actionTo} className="btn-primary empty-state-action">
          {actionText}
        </Link>
      ) : onAction ? (
        <button type="button" className="btn-primary empty-state-action" onClick={onAction}>
          {actionText}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;