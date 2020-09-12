import PropTypes from 'prop-types';

export default PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  dashboardId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  taskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
});
