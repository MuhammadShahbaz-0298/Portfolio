// Projects shown in the Work section. To add a project, copy one object.
// - featured: true  -> large numbered entry with a screenshot (alternating sides)
// - featured: false -> compact row with a small thumbnail
// - image: screenshot in public/projects/ (or null)
export const projectList = [
  {
    id: 'campus-coin',
    title: 'Campus Coin',
    summary:
      'Full-stack budgeting app with role-based access, monthly budgets with alerts, and income-vs-expense reports.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/projects/campus-coin.webp',
    liveUrl: 'https://campuscoin-97dc7.containers.snapdeploy.app',
    githubUrl: 'https://github.com/MuhammadShahbaz-0298/campuscoin-frontend',
    featured: true,
  },
  {
    id: 'school-portal',
    title: 'School Portal',
    summary:
      'Portal with role permissions, file uploads, assignment grading and per-role dashboards.',
    stack: ['React', 'Redux', 'Node.js', 'MongoDB'],
    image: '/projects/school-portal.webp',
    liveUrl: 'https://portal-schools.up.railway.app',
    githubUrl: 'https://github.com/MuhammadShahbaz-0298/PORTAL-frontend',
    featured: true,
  },
  {
    id: 'bookstore-app',
    title: 'BookStore Mobile App',
    summary:
      'Flutter bookstore app with cart, checkout, wishlist and admin roles on Firebase.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    image: '/projects/bookstore.webp',
    liveUrl: null,
    githubUrl: 'https://github.com/MuhammadShahbaz-0298/Book_Store_Flutter',
    featured: false,
  },
];
