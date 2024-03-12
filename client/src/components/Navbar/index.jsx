import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const currentPage = useLocation().pathname;

  return (
    <nav className="main-header-menu">
      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
      >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/students" className={currentPage === '/students' ? 'nav-link active' : 'nav-link text-light'}>Students</Link>
          </li>
          <li className="nav-item">
            <Link to="/createexam" className={currentPage === '/createexam' ? 'nav-link active' : 'nav-link text-light'}>Create Exam</Link>
          </li>
          <li className="nav-item">
            <Link to="/createquestion" className={currentPage === '/createquestion' ? 'nav-link active' : 'nav-link text-light'}>Add Questions</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}