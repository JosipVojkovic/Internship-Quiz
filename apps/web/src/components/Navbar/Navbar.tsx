import c from "./Navbar.module.css";
import QuizLogo from "../../assets/images/QuizLogo.png";
import { useNavigate } from "react-router";
import { useQuizCategoriesQuery } from "../../api";
import { useRef, useState } from "react";
import SearchIcon from "../../assets/images/icons8-search.svg";
import Sidebar from "../Sidebar/Sidebar";

type CategoriesType = { id: string; name: string; createdAt: string };

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useQuizCategoriesQuery();

  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const burgerIconRef = useRef<HTMLDivElement>(null);

  const handleSearchQuizzes = () => {
    const selectedTitle = titleRef.current?.value || "";
    const selectedCategory = categoryRef.current?.value || "";

    const searchParams = new URLSearchParams();
    if (selectedTitle) searchParams.append("title", selectedTitle);
    if (selectedCategory) searchParams.append("category", selectedCategory);

    navigate(`/quiz?${searchParams}`);
  };

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <nav>
      <div
        className={c.logo}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={QuizLogo} alt="Quiz logo" />
        <h2>uizizz</h2>
      </div>
      <div className={c.navActions}>
        <div className={c.searchQuiz}>
          <select
            name="quizCategory"
            id="quizCategory"
            defaultValue=""
            ref={categoryRef}
          >
            <option value="">All</option>
            {Array.isArray(data) &&
              data.map((qc: CategoriesType) => (
                <option key={qc.id} value={qc.id}>
                  {qc.name}
                </option>
              ))}
          </select>
          <input type="text" placeholder="Quiz search..." ref={titleRef} />
          <img src={SearchIcon} onClick={handleSearchQuizzes} />
        </div>

        <div
          className={`${c.burgerMenuIcon} ${isOpen ? c.open : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          ref={burgerIconRef}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Sidebar
          isOpen={isOpen}
          setIsOpen={handleSetIsOpen}
          burgerIconRef={burgerIconRef}
        />
      </div>
    </nav>
  );
}
