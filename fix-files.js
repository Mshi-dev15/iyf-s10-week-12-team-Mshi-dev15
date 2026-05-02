const fs = require('fs');
const { execSync } = require('child_process');

const files = [
  ['frontend/Team/Routing-Navigation', 'frontend/src/components/Layout/Layout.jsx'],
  ['frontend/Team/Routing-Navigation', 'frontend/src/components/ProtectedRoute.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/Home.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/Posts.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/PostDetail.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/CreatePost.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/About.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/Login.jsx'],
  ['frontend/Team/Pages-Features', 'frontend/src/pages/Register.jsx'],
  ['origin/frontend/Mshi-dev15-auth-state', 'frontend/src/context/AuthContext.jsx']
];

files.forEach(([branch, path]) => {
  try {
    const content = execSync(`git show ${branch}:${path}`, { encoding: 'utf8' });
    fs.writeFileSync(path, content);
    console.log('✓', path);
  } catch(e) {
    console.error('✗', path, e.message);
  }
});
