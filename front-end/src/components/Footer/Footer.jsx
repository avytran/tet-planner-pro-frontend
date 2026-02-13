import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 className="footer-title">Lucky Money</h3>
          <p className="footer-desc">
            Ứng dụng hỗ trợ lập kế hoạch Tết, quản lý công việc và ngân sách.
          </p>
        </div>

        <div className="footer-links">
          <h4>Liên kết</h4>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/task-management">Task management</a>
            </li>
            <li>
              <a href="/budget-management">Budget management</a>
            </li>
            <li>
              <a href="/shopping-list">Shopping list</a>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@luckymoney.vn</p>
          <p>Hotline: 0901 234 567</p>
          <p>Address: Q.1, TP.HCM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Lucky Money. All rights reserved.</span>
        <div className="footer-social">
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
