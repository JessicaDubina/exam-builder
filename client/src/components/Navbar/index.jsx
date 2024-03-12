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
            <Link to="/" className={currentPage === '/students' ? 'nav-link active' : 'nav-link text-light'}>Students</Link>
          </li>
          <li className="nav-item">
            <Link to="/instructor" className={currentPage === '/instructor' ? 'nav-link active' : 'nav-link text-light'}>Create Exam</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={currentPage === '/contact' ? 'nav-link active' : 'nav-link text-light'}>Contact Me</Link>
          </li>
          <li className="nav-item">
            <Link to="/resume" className={currentPage === '/resume' ? 'nav-link active' : 'nav-link text-light'}>Resume</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}