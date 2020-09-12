import PropTypes from 'prop-types';

export default PropTypes.shape({
  columnId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});
