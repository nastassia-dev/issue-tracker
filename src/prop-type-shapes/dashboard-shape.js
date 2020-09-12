import PropTypes from 'prop-types';

export default PropTypes.shape({
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  createdAt: PropTypes.string,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});
