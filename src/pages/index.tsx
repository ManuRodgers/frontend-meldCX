// import React from 'react';
// import styles from './index.less';
// import { formatMessage } from 'umi-plugin-locale';
// export default function() {
//   return (
//     <div className={styles.normal}>
//       <div className={styles.welcome} />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
//         <li>
//           <a href="https://umijs.org/guide/getting-started.html">
//             {formatMessage({ id: 'index.start' })}
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

import * as React from 'react';

import "./index.less"

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  return <div className={'bg'}>app</div>;
};

export default App;