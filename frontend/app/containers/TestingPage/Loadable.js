/**
 * Asynchronously loads the component for TestingPage
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
