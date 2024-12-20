# LetsWatch  

LetsWatch is a web application designed to provide an enhanced viewing experience by combining a robust backend with a responsive frontend.  

## Features  
- Interactive and dynamic user interface.  
- Backend powered by Flask for handling API requests.  
- Dockerized for easy deployment and scalability.  

## Project Structure  
```plaintext  
letswatch/  
├── backend/        # Flask backend code  
│   ├── app.py      # Main application script  
│   ├── requirements.txt # Python dependencies 

├── frontend/       # Frontend code  
│   ├── index.html  # Main HTML file  
│   ├── assets/     # CSS, JS, and images  
├── Dockerfile      # Backend Dockerfile  
├── docker-compose.yml # Compose file for multi-container setup  

\documentclass[letterpaper,10.5pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage[sfdefault]{roboto}
\usepackage{fontawesome}
\input{glyphtounicode}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.3in}
\addtolength{\evensidemargin}{-0.3in}
\addtolength{\textwidth}{0.6in}
\addtolength{\topmargin}{-0.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\color{MidnightBlue}
}{}{0em}{}[\color{black}\titlerule \vspace{-4pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge \scshape Giorgi Kurtanidze} \\ \vspace{1pt}
    \small \faPhone\ +66-083-167-50-25 $|$ \href{mailto:thinkers.struggle@gmail.com}{\underline{thinkers.struggle@gmail.com}} $|$ 
    \href{https://linkedin.com/in/giorgi-kurtanidze170904}{\underline{linkedin.com/in/giorgi-kurtanidze170904}} $|$
    \href{https://github.com/kurta17}{\underline{github.com/kurta17}}
\end{center}

%----------SUMMARY----------
\section{Summary}
\resumeSubHeadingListStart
\resumeSubItem{Highly motivated Computer Science student with experience in full-stack development, competitive programming, and educational platforms. Proven track record of developing robust applications and teaching complex mathematical concepts.}
\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
  \resumeSubheading
      {Harbour.Space University @ University of the Thai Chamber of Commerce}{Bangkok, Thailand}
      {Bachelor of Computer Science}{Aug. 2023 -- Present}
  
  \resumeSubheading
      {Tbilisi Public School №199 of Physics and Mathematics}{Tbilisi, Georgia}
      {Gold Medal for Academic Excellence}{Sep. 2017 -- May 2023}
  \resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Competitive Programmer}{Sep 2023 -- Present}
      {Harbour.Space University}{}
      \resumeItemListStart
        \resumeItem{Strong math skills and problem-solving ability honed through consistent training on competitive programming platforms.}
        \resumeItem{Placed 17th in ICPC Thailand 2024, competing with top teams nationwide.}
        \resumeItem{Ranked 5th among Thai teams in the ICPC Regional Indonesia 2024, demonstrating effective teamwork and problem-solving skills.}
      \resumeItemListEnd

    \resumeSubheading
      {Math Tutor}{Mar 2022 -- Present}
      {Arithmos Academy, Tbilisi, Georgia}{}
      \resumeItemListStart
        \resumeItem{Created an educational Facebook page with 1800 members, supporting students through online math courses and maintaining the Arithmos Academy website.}
        \resumeItem{Taught Algebra, Geometry, Linear Algebra, and Calculus.}
      \resumeItemListEnd

  \resumeSubHeadingListEnd

%-----------PROJECTS-----------
\section{Projects}
\resumeSubHeadingListStart

    \resumeProjectHeading
      {\textbf{LetsWatch} $|$ \emph{Python · Cosine Similarity · Vectorized Operations · Flask · React · Tailwind CSS · Docker · Pandas} \\
      \small \href{https://github.com/kurta17/letswatch}{GitHub Repository}}{Dec 2024 - Now}
      \resumeItemListStart
        \resumeItem{LetsWatch uses machine learning techniques, specifically cosine similarity, to provide personalized movie recommendations based on user searches. Built with Flask for the backend, React and Tailwind CSS for the frontend, and Docker for scalability.}
      \resumeItemListEnd

    \resumeProjectHeading
      {\textbf{Bazari (Reddit-like website)} $|$ \emph{Flask · Python · JSON · Bootstrap · Redis · PostgreSQL · Docker} \\
      \small \href{https://github.com/kurta17/bazari}{GitHub Repository}}{May 2024}
      \resumeItemListStart
        \resumeItem{Enhanced full-stack development skills by integrating user authentication, real-time data management with Redis, and efficient database handling with PostgreSQL. Deployed on Koyeb using Docker.}
      \resumeItemListEnd

    \resumeProjectHeading
      {

\[_{{{CITATION{{{_1{](https://github.com/kylegrantlucas/resume-exporter/tree/e48fa87604eeda0101553f7d2e00ac849a85311f/templates%2Fclassic.go)[_{{{CITATION{{{_2{](https://github.com/anbrake/anbrake.github.io/tree/b0b469be67856f4fa9b2f9c62c8414e26ce5b70c/resume.md)