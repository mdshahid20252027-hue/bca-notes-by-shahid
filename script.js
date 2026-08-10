function toggleNav(){
  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.classList.toggle('show');
  document.body.classList.toggle(
    'menu-open',
    nav.classList.contains('show')
  );
}
function toggleTheme(){document.body.classList.toggle('dark');let d=document.body.classList.contains('dark');localStorage.setItem('aku-notes-theme',d?'dark':'light');document.querySelector('header button').textContent=d?'☀️':'🌙'}
function answer(btn){let q=btn.closest('.q');q.querySelectorAll('button').forEach(x=>x.classList.remove('correct','wrong'));if(btn.dataset.correct==='true'){btn.classList.add('correct');q.querySelector('span').textContent='Correct!'}else{btn.classList.add('wrong');q.querySelectorAll('button[data-correct="true"]').forEach(x=>x.classList.add('correct'));q.querySelector('span').textContent='Incorrect — the correct option is highlighted.'}}
function scoreQuiz(btn){let box=btn.closest('.quiz'), qs=box.querySelectorAll('.q'), score=0;qs.forEach(q=>{let c=q.querySelector('button.correct');if(c&&c.dataset.correct==='true')score++});let s=box.querySelector('.score');s.textContent='Score: '+score+'/'+qs.length}
document.addEventListener('DOMContentLoaded',()=>{if(localStorage.getItem('aku-notes-theme')==='dark'){document.body.classList.add('dark');document.querySelector('header button').textContent='☀️'}document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.getElementById('nav').classList.remove('show'))})
const BM_KEY='aku-bca-v31-bookmarks';
function getBookmarks(){try{return JSON.parse(localStorage.getItem(BM_KEY)||'[]')}catch(e){return[]}}
function saveBookmarks(x){localStorage.setItem(BM_KEY,JSON.stringify(x));updateBookmarkUI()}
function toggleBookmark(id,title){
  let b=getBookmarks(), i=b.findIndex(x=>x.id===id);
  if(i>=0)b.splice(i,1); else b.push({id,title});
  saveBookmarks(b);
  document.querySelectorAll('[onclick*="'+id+'"]').forEach(el=>{if(el.classList.contains('bookmark-btn')){el.classList.toggle('saved',b.some(x=>x.id===id));el.textContent=b.some(x=>x.id===id)?'★ Saved':'☆ Save'}});
}
function updateBookmarkUI(){
  const b=getBookmarks(); const c=document.getElementById('bookmarkCount'); if(c)c.textContent=b.length;
  b.forEach(x=>{document.querySelectorAll('[onclick*="'+x.id+'"]').forEach(el=>{if(el.classList.contains('bookmark-btn')){el.classList.add('saved');el.textContent='★ Saved'}})});
}
function showBookmarks(){
  const p=document.getElementById('bookmarkPanel'), list=document.getElementById('bookmarkList'); let b=getBookmarks();
  list.innerHTML=b.length?b.map(x=>`<div class="saved-item"><a href="#${x.id}" onclick="closePanels()">${x.title}</a><button onclick="toggleBookmark('${x.id}','${x.title.replace(/'/g,"`")}');showBookmarks()">Remove</button></div>`).join(''):'<p style="color:var(--muted)">No saved chapters yet. Tap ☆ Save on any chapter.</p>';
  p.hidden=false;
}
function closePanels(){document.getElementById('bookmarkPanel').hidden=true;document.getElementById('searchResults').innerHTML=''}
function globalSearchNotes(q){
  q=q.trim().toLowerCase(); const box=document.getElementById('searchResults');
  if(!q){box.innerHTML='';return}
  let results=[];
  document.querySelectorAll('[data-searchable="true"]').forEach(ch=>{
    const text=ch.innerText.toLowerCase(); if(text.includes(q)){
      const h=ch.querySelector('h3'); const sec=ch.closest('.subject'); const sh=sec?sec.querySelector('h2')?.textContent:'Notes';
      results.push(`<a class="result-item" href="#${ch.id}" onclick="closePanels()"><small>${sh}</small>${h?.textContent||'Chapter'}</a>`);
    }
  });
  document.querySelectorAll('.subject-card').forEach(c=>{if(c.innerText.toLowerCase().includes(q))results.unshift(`<a class="result-item" href="${c.getAttribute('href')}" onclick="closePanels()"><small>SUBJECT</small>${c.querySelector('h3')?.textContent||'Subject'}</a>`)});
  box.innerHTML=results.length?results.slice(0,30).join(''):'<div class="result-item">No matching chapter or subject found.</div>';
}
function clearGlobalSearch(){document.getElementById('globalSearch').value='';document.getElementById('searchResults').innerHTML=''}
function updateProgress(){
  const chapters=[...document.querySelectorAll('.chapter')], b=getBookmarks(), saved=new Set(b.map(x=>x.id));
  let overall=chapters.length?Math.round(saved.size/chapters.length*100):0;
  const pf=document.getElementById('progressFill'),pt=document.getElementById('progressText');if(pf)pf.style.width=overall+'%';if(pt)pt.textContent=overall+'%';
  document.querySelectorAll('.subject').forEach(sec=>{
    const all=[...sec.querySelectorAll('.chapter')], n=all.filter(x=>saved.has(x.id)).length, p=all.length?Math.round(n/all.length*100):0;
    const sid=sec.id, t=document.getElementById('prog-'+sid), f=document.getElementById('fill-'+sid);
    if(t)t.textContent=p+'%';if(f)f.style.width=p+'%';
  });
}
const oldSaveBookmarks=saveBookmarks; saveBookmarks=function(x){localStorage.setItem(BM_KEY,JSON.stringify(x));updateBookmarkUI();updateProgress()};
document.addEventListener('DOMContentLoaded',()=>{updateBookmarkUI();updateProgress()});
window.addEventListener('scroll',updateProgress);

const V32_BANKS = {"os": [["What is the main role of an operating system?", ["Manage hardware/resources and provide services to programs", "Only browse the internet", "Only compile C programs", "Only store passwords"], 0], ["Which scheduling algorithm uses a time quantum?", ["FCFS", "Round Robin", "SJF", "Priority only"], 1], ["Which condition is NOT one of the four necessary deadlock conditions?", ["Mutual exclusion", "Hold and wait", "Circular wait", "Compilation"], 3], ["What does paging divide logical memory into?", ["Pages", "Tracks", "Files", "Processes"], 0], ["Which Unix command shows the current working directory?", ["pwd", "cd", "mv", "grep"], 0], ["Which command changes file permissions?", ["chmod", "ps", "cat", "who"], 0], ["A process is best described as:", ["A program in execution", "A stored document", "A CPU register", "A file extension"], 0], ["Which mechanism helps coordinate concurrent processes?", ["Semaphore", "Compiler", "Text editor", "Loader only"], 0], ["What is a context switch?", ["Saving/restoring execution state when CPU changes processes", "Changing a file name", "Changing a password", "Formatting a disk"], 0], ["Virtual memory primarily allows:", ["A process to use an address space larger than available physical memory", "Only faster printing", "Only more CPU cores", "Removal of the file system"], 0], ["Which command lists directory contents?", ["ls", "pwd", "cd", "kill"], 0], ["Which is a Unix-like open-source operating system?", ["Linux", "DOS only", "BIOS", "HTML"], 0], ["Thrashing is associated with:", ["Excessive paging activity", "Email delivery", "File naming", "CPU manufacturing"], 0], ["Which scheduling criterion measures time from submission to completion?", ["Turnaround time", "Page size", "File size", "Seek count"], 0], ["Which OS service provides controlled access to hardware/resources?", ["System calls and OS services", "Spreadsheet formulas", "HTML tags", "CSS selectors"], 0], ["Which Unix feature connects one command's output to another's input?", ["Pipe", "Macro", "Pointer", "Thread"], 0], ["Which command is commonly used to terminate/send a signal to a process?", ["kill", "mkdir", "cat", "du"], 0], ["Which memory allocation approach uses fixed-size pages and frames?", ["Paging", "Segmentation only", "Spooling", "Caching only"], 0], ["What does PATH commonly contain?", ["Directories searched for executable commands", "Only passwords", "CPU registers", "Database rows"], 0], ["Which utility searches text for a pattern?", ["grep", "mv", "mkdir", "chmod"], 0]], "c": [["What is an algorithm?", ["A finite sequence of unambiguous steps to solve a problem", "A hardware device", "A database table", "A compiler error"], 0], ["Which data type is commonly used for whole numbers in C?", ["int", "char", "float", "double only"], 0], ["Which operator obtains the address of a variable?", ["&", "*", "%", "->"], 0], ["Which operator dereferences a pointer?", ["&", "*", "#", "@"], 1], ["Which loop executes its body at least once?", ["for", "while", "do-while", "switch"], 2], ["Which storage class can preserve a local variable's value between function calls?", ["auto", "static", "register", "typedef"], 1], ["Which function opens a file in C?", ["fopen()", "fileopen()", "openfile()", "read()"], 0], ["A C string ends with:", ["A null character \\0", "A newline only", "EOF always", "A comma"], 0], ["Which statement exits a loop immediately?", ["break", "continue", "return only", "goto only"], 0], ["Recursion requires:", ["A base case", "A graphics card", "A database", "A macro only"], 0], ["Which is a user-defined aggregate type in C?", ["struct", "goto", "switch", "sizeof"], 0], ["Which keyword defines a constant-like macro?", ["#define", "#const", "macro", "constant"], 0], ["Which operator performs logical AND?", ["&&", "&", "||", "!"], 0], ["Which operator performs bitwise XOR?", ["^", "&&", "||", "**"], 0], ["What does a pointer store?", ["A memory address", "Only a character", "A function name only", "A file extension"], 0], ["Which function closes a file?", ["fclose()", "closefile()", "endfile()", "stop()"], 0], ["Which loop is often convenient when the number of iterations is known?", ["for", "switch", "if", "goto"], 0], ["What is pseudocode used for?", ["Expressing algorithm logic before implementation", "Executing binary code", "Allocating RAM", "Creating a database"], 0], ["Which preprocessor directive includes a header?", ["#include", "#header", "#import", "#using"], 0], ["What is debugging?", ["Finding and correcting program defects", "Compressing files", "Installing RAM", "Drawing a flowchart only"], 0]], "sad": [["What does SDLC stand for?", ["Systems Development Life Cycle", "Software Data Logic Code", "System Design Level Control", "Software Development Language"], 0], ["Which role studies business problems and user requirements?", ["Systems analyst", "Printer operator", "Network cable", "Database row"], 0], ["Which feasibility considers technology and skills?", ["Technical", "Economic", "Legal", "Operational only"], 0], ["Which feasibility considers costs and benefits?", ["Economic", "Technical", "Legal", "Physical"], 0], ["Which diagram focuses on movement of data?", ["DFD", "ER diagram", "Gantt chart", "Org chart"], 0], ["Which model represents entities and relationships?", ["ER diagram", "DFD", "Flowchart only", "Decision table only"], 0], ["Good modular design generally aims for:", ["High cohesion and low coupling", "Low cohesion and high coupling", "Maximum dependency", "No modules"], 0], ["What is an SRS?", ["System Requirements Specification", "System Resource Summary", "Software Report Sheet", "System Review Standard"], 0], ["JAD is mainly used to:", ["Facilitate collaborative requirements work", "Format a hard disk", "Compile C", "Encrypt files"], 0], ["A prototype is:", ["An early working model used to explore/refine requirements", "A final legal contract", "A CPU register", "A file permission"], 0], ["Which technique can collect requirements by directly asking users questions?", ["Interview", "Paging", "Compilation", "Linking"], 0], ["A data dictionary documents:", ["Definitions/details of data elements and flows", "CPU temperature only", "Passwords only", "HTML colors"], 0], ["A decision table is useful for:", ["Representing combinations of conditions and actions", "Storing images", "Scheduling CPU only", "Drawing network cables"], 0], ["Which design concept means a module has closely related responsibilities?", ["Cohesion", "Coupling", "Inheritance", "Recursion"], 0], ["Which concept describes dependency between modules?", ["Coupling", "Cohesion", "Parsing", "Paging"], 0], ["Which stage follows analysis in a typical SDLC?", ["Design", "Formatting", "Printing", "Archiving"], 0], ["Operational feasibility asks whether:", ["The proposed system can work in the organization's environment", "The CPU is fast enough only", "The code has no syntax errors", "A file is compressed"], 0], ["Why is documentation important?", ["It supports understanding, use, testing and maintenance", "It replaces all testing", "It eliminates users", "It increases screen brightness"], 0], ["A system audit evaluates:", ["Controls, procedures and system effectiveness", "Only keyboard layout", "Only font size", "Only internet speed"], 0], ["Security controls help protect:", ["Confidentiality, integrity and availability", "Only screen color", "Only file names", "Only printer ink"], 0]], "english": [["Which is most appropriate in a formal business email?", ["Clear, concise and professional language", "Slang only", "All capital letters", "Unstructured chat language"], 0], ["What is paraphrasing?", ["Expressing the same meaning in different words", "Copying every sentence", "Changing the topic", "Adding unrelated facts"], 0], ["What do minutes record?", ["Meeting proceedings, decisions and actions", "Only attendance photos", "Product prices", "Passwords"], 0], ["What does an agenda contain?", ["Items to be discussed in a meeting", "A salary slip", "A program's source code", "A database schema"], 0], ["A business inquiry usually asks for:", ["Information or details", "Punishment", "A password", "A resignation"], 0], ["A complaint should generally be:", ["Objective, specific and solution-oriented", "Abusive", "Unclear", "Very informal"], 0], ["Which writing type presents reasons for a position?", ["Argumentative writing", "Descriptive only", "Narrative only", "Dictionary entry"], 0], ["What is the purpose of a résumé?", ["Present relevant qualifications and experience", "Tell a fictional story", "Record meeting minutes", "List computer commands"], 0], ["A good presentation should have:", ["A clear structure and audience-focused delivery", "No opening", "No conclusion", "Only animations"], 0], ["In a debate, a claim should ideally be supported by:", ["Reasoning and evidence", "Personal attacks", "Random words", "Silence"], 0], ["Which is a good listening practice?", ["Identify key points and clarify important details", "Interrupt constantly", "Ignore context", "Avoid notes"], 0], ["Which document formally asks for information?", ["Inquiry letter/email", "Minutes", "Invoice only", "Agenda"], 0], ["A proposal generally presents:", ["A plan or recommendation with supporting details", "Only greetings", "A list of passwords", "A poem"], 0], ["Which tone is usually suitable for professional communication?", ["Polite, clear and appropriate to the audience", "Aggressive", "Sarcastic", "Slang-heavy"], 0], ["An abstract is:", ["A concise overview of a larger work", "A full transcript", "A password list", "A meeting room"], 0], ["What is the main purpose of a notice?", ["Communicate important information briefly to a defined audience", "Provide source code", "Store database records", "Explain CPU scheduling"], 0], ["Which is important before sending an important email?", ["Check facts, tone, grammar and attachments", "Remove the subject", "Use only emojis", "Write without rereading"], 0], ["Impromptu speaking means:", ["Speaking with little or no preparation time", "Reading a full prepared manuscript only", "Writing an email", "Taking meeting minutes"], 0], ["Business etiquette includes:", ["Respectful and appropriate professional behavior", "Ignoring others", "Using offensive language", "Interrupting everyone"], 0], ["A summary should:", ["Present key points concisely", "Copy every detail", "Add unrelated opinions", "Change the original meaning"], 0]], "math": [["Which method repeatedly halves an interval containing a root?", ["Bisection method", "Newton-Raphson", "Gauss-Seidel", "Simpson's rule"], 0], ["Percentage error is:", ["Relative error × 100", "Absolute error + true value", "True value ÷ error", "Approximate value × 100"], 0], ["Newton-Raphson uses:", ["A tangent-line based iteration", "Only a difference table", "A trapezoid", "A matrix inverse only"], 0], ["Which interpolation method can handle unequal x-spacing directly?", ["Lagrange interpolation", "Forward difference only", "Trapezoidal rule", "Gauss-Seidel"], 0], ["Forward differences are especially useful near the:", ["Beginning of an equally spaced table", "End only", "Middle only", "No location"], 0], ["Backward differences are especially useful near the:", ["End of an equally spaced table", "Beginning only", "No location", "Root only"], 0], ["The trapezoidal rule approximates area using:", ["Trapezoids", "Circles", "Cubes", "Only tangents"], 0], ["Simpson's 1/3 rule uses:", ["Quadratic/parabolic approximation over suitable intervals", "Only straight lines", "Only matrices", "Only derivatives"], 0], ["Which method is a direct method for linear equations?", ["Gauss elimination", "Gauss-Seidel", "Bisection", "Lagrange"], 0], ["Which is an iterative method for linear systems?", ["Gauss-Seidel", "Gauss-Jordan", "Gauss elimination", "Lagrange"], 0], ["Gauss-Jordan aims to transform a system toward:", ["Reduced row-echelon form", "A difference table", "A polynomial only", "A Unix command"], 0], ["RK4 is a method for solving:", ["Ordinary differential equations", "Only algebraic roots", "Only interpolation", "Only matrix inversion"], 0], ["Relative error compares absolute error with:", ["The true value (in magnitude)", "The CPU speed", "The step number", "The file size"], 0], ["Interpolation is mainly used to estimate:", ["An unknown value within the range of known data", "A CPU temperature", "A password", "A process state"], 0], ["Divided differences are useful for:", ["Interpolation with general/unequal spacing", "CPU scheduling", "File permissions", "Grammar"], 0], ["Euler's method uses:", ["The slope at the current point to advance the solution", "Only a matrix inverse", "Only a polynomial table", "Only a midpoint"], 0], ["What is a stopping criterion?", ["A rule for deciding when iterations are accurate enough", "A sorting algorithm", "A compiler directive", "A file mode"], 0], ["Ill-conditioned systems are sensitive to:", ["Small changes in data/rounding", "Only screen size", "Only keyboard input", "Only file names"], 0], ["Which method is associated with central differences?", ["Gauss central-difference formula", "FCFS", "Gauss-Seidel only", "fopen"], 0], ["Numerical methods are useful when:", ["Exact solutions are difficult, unavailable or impractical", "No calculations are needed", "Only text is being written", "Only files are copied"], 0]]};

let exam={questions:[],index:0,answers:[],subject:'',timer:null,seconds:0,start:0};
function shuffle(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function startExam(){
  clearInterval(exam.timer);
  const sid=document.getElementById('quizSubject').value, count=Number(document.getElementById('quizCount').value), seconds=Number(document.getElementById('quizTime').value);
  exam.subject=sid; exam.questions=shuffle(V32_BANKS[sid]).slice(0,count).map(q=>({q:q[0],opts:shuffle(q[1].map((o,i)=>({text:o,correct:i===q[2]})))}));
  exam.index=0;exam.answers=Array(exam.questions.length).fill(null);exam.seconds=seconds;exam.start=Date.now();
  document.getElementById('examArea').hidden=false;document.getElementById('examResult').hidden=true;
  document.getElementById('examTotal').textContent=exam.questions.length;
  document.getElementById('examTitle').textContent=document.getElementById('quizSubject').selectedOptions[0].textContent+' — Exam';
  renderExamQuestion();
  if(seconds){updateTimer();exam.timer=setInterval(()=>{exam.seconds--;updateTimer();if(exam.seconds<=0)finishExam(true)},1000)}else document.getElementById('timer').textContent='No Timer';
  document.getElementById('examArea').scrollIntoView({behavior:'smooth',block:'start'});
}
function updateTimer(){let s=Math.max(0,exam.seconds),m=Math.floor(s/60),sec=s%60;document.getElementById('timer').textContent='⏱ '+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')}
function renderExamQuestion(){
  const x=exam.questions[exam.index];document.getElementById('examNum').textContent=exam.index+1;
  document.getElementById('examProgressFill').style.width=((exam.index+1)/exam.questions.length*100)+'%';
  const wrap=document.getElementById('examQuestion');
  wrap.innerHTML='<div class="exam-q">'+x.q+'</div><div class="exam-options">'+x.opts.map((o,i)=>`<button class="exam-option ${exam.answers[exam.index]===i?'selected':''}" onclick="selectExamAnswer(${i})">${String.fromCharCode(65+i)}. ${o.text}</button>`).join('')+'</div>';
}
function selectExamAnswer(i){exam.answers[exam.index]=i;renderExamQuestion()}
function prevQuestion(){if(exam.index>0){exam.index--;renderExamQuestion()}}
function nextQuestion(){if(exam.index<exam.questions.length-1){exam.index++;renderExamQuestion()}else finishExam()}
function finishExam(auto=false){
  if(!exam.questions.length)return;clearInterval(exam.timer);
  let score=0;exam.questions.forEach((q,i)=>{if(exam.answers[i]!=null&&q.opts[exam.answers[i]].correct)score++});
  let pct=Math.round(score/exam.questions.length*100), key='aku-v32-best-'+exam.subject, best=Number(localStorage.getItem(key)||0);
  if(pct>best)localStorage.setItem(key,pct);
  v42RecordAttempt(exam.subject, pct, score, exam.questions.length);
  const msg=pct>=80?'Excellent! 🎉':pct>=60?'Good job! Keep revising. 👍': 'Keep practicing — you can improve. 💪';
  const res=document.getElementById('examResult');res.hidden=false;
  res.innerHTML=`<div class="result-score">${pct}%</div><h3>${score}/${exam.questions.length} correct</h3><p class="result-message">${auto?'Time is up. ':''}${msg}</p><p>Best score for this subject: <b>${Math.max(pct,best)}%</b></p><div class="review"><h3>Review</h3>${exam.questions.map((q,i)=>{let ok=exam.answers[i]!=null&&q.opts[exam.answers[i]].correct;let ans=q.opts.find(o=>o.correct)?.text;return `<div class="review-row ${ok?'correct':'wrong'}"><b>${i+1}.</b> ${ok?'Correct':'Review'} — ${q.q}<br><small>Correct answer: ${ans}</small></div>`}).join('')}</div><button class="primary" onclick="startExam()">Retry Quiz</button>`;
  res.scrollIntoView({behavior:'smooth',block:'start'});
}

function showLab(name){
  document.querySelectorAll('.lab-panel').forEach(x=>x.hidden=true);
  document.getElementById('lab-'+name).hidden=false;
  document.querySelectorAll('.lab-tab').forEach(x=>x.classList.remove('active'));
  const labels={root:'Root Finding',interp:'Interpolation',integrate:'Integration',linear:'Linear Systems',ode:'ODE'};
  document.querySelectorAll('.lab-tab').forEach(x=>{if(x.textContent===labels[name])x.classList.add('active')});
}
function safeExpr(s,vars){
  let e=s.toLowerCase().replace(/\^/g,'**').replace(/\bpi\b/g,'Math.PI').replace(/\be\b/g,'Math.E');
  e=e.replace(/\bsin\(/g,'Math.sin(').replace(/\bcos\(/g,'Math.cos(').replace(/\btan\(/g,'Math.tan(').replace(/\bsqrt\(/g,'Math.sqrt(').replace(/\babs\(/g,'Math.abs(').replace(/\blog\(/g,'Math.log(').replace(/\bexp\(/g,'Math.exp(');
  if(!/^[0-9+\-*/().,\sA-Za-z_*]+$/.test(e)||/(constructor|window|document|globalThis|Function|eval|import|fetch|localStorage|sessionStorage|alert|prompt)/i.test(e))throw Error('Unsupported expression.');
  const names=Object.keys(vars), vals=Object.values(vars);
  return Function(...names,'return ('+e+')')(...vals);
}
function num(v){let n=Number(v);if(!Number.isFinite(n))throw Error('Please enter valid numbers.');return n}
function out(id,html){document.getElementById(id).innerHTML=html}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function solveRoot(){
 try{
  const f=document.getElementById('r-f').value, method=document.getElementById('r-method').value,a0=num(document.getElementById('r-a').value),b0=num(document.getElementById('r-b').value),tol=Math.abs(num(document.getElementById('r-tol').value));
  if(tol<=0)throw Error('Tolerance must be positive.');
  const fn=x=>safeExpr(f,{x}),steps=[];let root=null;
  if(method==='newton'){
   let x=a0;
   for(let i=1;i<=50;i++){let fx=fn(x),d=(fn(x+1e-6)-fn(x-1e-6))/2e-6;if(Math.abs(d)<1e-12)throw Error('Derivative became too small. Try another initial value.');let xn=x-fx/d;steps.push(`Iteration ${i}: x = ${x.toFixed(8)}, f(x) = ${fx.toFixed(8)}, x(next) = ${xn.toFixed(8)}`);if(Math.abs(xn-x)<tol){root=xn;break}x=xn}
  }else{
   let a=a0,b=b0,fa=fn(a),fb=fn(b);if(fa*fb>0)throw Error('For bracketing methods, f(a) and f(b) must have opposite signs.');
   for(let i=1;i<=60;i++){let c=method==='false'?(a*fb-b*fa)/(fb-fa):(a+b)/2,fc=fn(c);steps.push(`Iteration ${i}: a=${a.toFixed(8)}, b=${b.toFixed(8)}, x=${c.toFixed(8)}, f(x)=${fc.toFixed(8)}`);if(Math.abs(fc)<tol||Math.abs(b-a)<tol){root=c;break}if(fa*fc<0){b=c;fb=fc}else{a=c;fa=fc}}
  }
  if(root===null)throw Error('Maximum iterations reached. Try a different starting interval/value.');
  out('r-out',`<div class="answer">Approximate root = ${root.toFixed(8)}</div>`+steps.map(x=>`<div class="step">${esc(x)}</div>`).join(''));
 }catch(e){out('r-out',`<div class="lab-error">${esc(e.message)}</div>`)}
}
function solveLagrange(){
 try{
  const xs=document.getElementById('i-x').value.split(',').map(num),ys=document.getElementById('i-y').value.split(',').map(num),xp=num(document.getElementById('i-xp').value);
  if(xs.length!==ys.length||xs.length<2)throw Error('X and Y must have the same number of values (at least 2).');
  if(new Set(xs).size!==xs.length)throw Error('X values must be distinct.');
  let total=0,steps=[];
  for(let i=0;i<xs.length;i++){let term=ys[i],parts=[];for(let j=0;j<xs.length;j++)if(i!==j){term*=((xp-xs[j])/(xs[i]-xs[j]));parts.push(`(${xp}-${xs[j]})/(${xs[i]}-${xs[j]})`)}total+=term;steps.push(`L${i} term = ${term.toFixed(8)} using ${parts.join(' × ')||'1'}`)}
  out('i-out',`<div class="answer">Interpolated value = ${total.toFixed(8)}</div>`+steps.map(x=>`<div class="step">${esc(x)}</div>`).join(''));
 }catch(e){out('i-out',`<div class="lab-error">${esc(e.message)}</div>`)}
}
function solveIntegration(){
 try{
  const f=document.getElementById('g-f').value,a=num(document.getElementById('g-a').value),b=num(document.getElementById('g-b').value),n0=Math.floor(num(document.getElementById('g-n').value));if(n0<2)throw Error('n must be at least 2.');
  const fn=x=>safeExpr(f,{x}),h=(b-a)/n0;let trap=(fn(a)+fn(b))/2;for(let i=1;i<n0;i++)trap+=fn(a+i*h);trap*=h;
  let n=n0%2===0?n0:n0+1,h2=(b-a)/n,sum1=0,sum2=0;for(let i=1;i<n;i++){let v=fn(a+i*h2);if(i%2)sum1+=v;else sum2+=v}let simp=(h2/3)*(fn(a)+fn(b)+4*sum1+2*sum2);
  out('g-out',`<div class="answer">Trapezoidal ≈ ${trap.toFixed(8)}<br>Simpson's 1/3 ≈ ${simp.toFixed(8)}</div><div class="step">h = (b-a)/n = ${h.toFixed(8)}</div><div class="step">Simpson uses n = ${n} (even)</div><div class="step">Use these as numerical approximations; compare with an exact integral when available.</div>`);
 }catch(e){out('g-out',`<div class="lab-error">${esc(e.message)}</div>`)}
}
function solveGaussian(){
 try{
  const rows=document.getElementById('l-matrix').value.trim().split(';').map(r=>r.split(',').map(num));if(!rows.length)throw Error('Enter a matrix.');const m=rows.length,n=rows[0].length;if(n!==m+1)throw Error('For an n×n system, enter n coefficients plus one RHS value per row.');if(rows.some(r=>r.length!==n))throw Error('Every row must have the same number of entries.');
  let A=rows.map(r=>r.slice()),steps=[];
  for(let k=0;k<m;k++){let pivot=k;for(let i=k+1;i<m;i++)if(Math.abs(A[i][k])>Math.abs(A[pivot][k]))pivot=i;if(Math.abs(A[pivot][k])<1e-12)throw Error('Zero pivot: system may be singular or need another method.');if(pivot!==k){[A[k],A[pivot]]=[A[pivot],A[k]];steps.push(`Swap R${k+1} ↔ R${pivot+1}`)}for(let i=k+1;i<m;i++){let factor=A[i][k]/A[k][k];for(let j=k;j<n;j++)A[i][j]-=factor*A[k][j];steps.push(`R${i+1} ← R${i+1} - (${factor.toFixed(6)})R${k+1}`)}}
  let x=Array(m).fill(0);for(let i=m-1;i>=0;i--){let s=A[i][n-1];for(let j=i+1;j<m;j++)s-=A[i][j]*x[j];x[i]=s/A[i][i]}
  out('l-out',`<div class="answer">Solution: ${x.map((v,i)=>`x${i+1} = ${v.toFixed(8)}`).join(' &nbsp; ')}</div>`+steps.map(x=>`<div class="step">${esc(x)}</div>`).join(''));
 }catch(e){out('l-out',`<div class="lab-error">${esc(e.message)}</div>`)}
}
function solveRK4(){
 try{
  const f=document.getElementById('o-f').value;let x=num(document.getElementById('o-x').value),y=num(document.getElementById('o-y').value),h=num(document.getElementById('o-h').value),n=Math.floor(num(document.getElementById('o-n').value));if(h===0||n<1)throw Error('Step h must be non-zero and number of steps must be positive.');
  const fn=(x,y)=>safeExpr(f,{x,y}),steps=[];
  for(let i=1;i<=n;i++){let k1=h*fn(x,y),k2=h*fn(x+h/2,y+k1/2),k3=h*fn(x+h/2,y+k2/2),k4=h*fn(x+h,y+k3);y+=((k1+2*k2+2*k3+k4)/6);x+=h;steps.push(`Step ${i}: k1=${k1.toFixed(8)}, k2=${k2.toFixed(8)}, k3=${k3.toFixed(8)}, k4=${k4.toFixed(8)}, x=${x.toFixed(8)}, y=${y.toFixed(8)}`)}
  out('o-out',`<div class="answer">RK4 result: y(${x.toFixed(8)}) = ${y.toFixed(8)}</div>`+steps.map(x=>`<div class="step">${esc(x)}</div>`).join(''));
 }catch(e){out('o-out',`<div class="lab-error">${esc(e.message)}</div>`)}
}

const V34_EXAMPLES={"hello": ["#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello, BCA!\\n\");\n    return 0;\n}", "Introduces the basic C program structure, printf(), main(), and return value."], "sum": ["#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"Sum = %d\\n\", a + b);\n    return 0;\n}", "Reads two integers and prints their sum. The & operator supplies addresses to scanf()."], "even": ["#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    if (n % 2 == 0)\n        printf(\"Even\\n\");\n    else\n        printf(\"Odd\\n\");\n    return 0;\n}", "Uses the remainder operator (%) to determine whether a number is divisible by 2."], "factorial": ["#include <stdio.h>\n\nint main(void) {\n    int n, i;\n    long long fact = 1;\n    scanf(\"%d\", &n);\n    for (i = 1; i <= n; i++) fact *= i;\n    printf(\"%lld\\n\", fact);\n    return 0;\n}", "Uses a for loop to multiply the integers from 1 through n."], "array": ["#include <stdio.h>\n\nint main(void) {\n    int a[5] = {2, 4, 6, 8, 10}, sum = 0;\n    for (int i = 0; i < 5; i++) sum += a[i];\n    printf(\"%d\\n\", sum);\n    return 0;\n}", "Shows array initialization, indexing and traversal with a loop."], "pointer": ["#include <stdio.h>\n\nint main(void) {\n    int x = 10;\n    int *p = &x;\n    printf(\"Value = %d\\n\", *p);\n    return 0;\n}", "p stores the address of x; *p dereferences that address to access x."], "file": ["#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen(\"data.txt\", \"w\");\n    if (fp == NULL) return 1;\n    fprintf(fp, \"BCA Notes\\n\");\n    fclose(fp);\n    return 0;\n}", "Demonstrates opening a file for writing, writing formatted text, checking the pointer and closing the file."]};

const V34_OUTPUT=[["What is printed?\nint x=5; printf(\"%d\", x+2);", ["5", "7", "2", "52"], 1], ["What is printed?\nint a=10; printf(\"%d\", a%3);", ["0", "1", "2", "3"], 1], ["What is printed?\nfor(int i=1;i<=3;i++) printf(\"%d\",i);", ["123", "012", "321", "111"], 0], ["What is printed?\nint x=4; if(x>3) printf(\"Yes\"); else printf(\"No\");", ["No", "Yes", "4", "Error"], 1], ["What is printed?\nint a[3]={2,4,6}; printf(\"%d\", a[1]);", ["2", "4", "6", "1"], 1], ["What is printed?\nint x=2; printf(\"%d\", x*x);", ["2", "4", "6", "8"], 1]];

const V34_DEBUG=[["Find the error:\nint main(void) { printf(\"Hello\") return 0; }", ["Missing semicolon after printf()", "Missing #include <stdio.h> only", "Wrong main name", "No error"], 0], ["Find the error:\nint x; scanf(\"%d\", x);", ["scanf needs &x for an int variable", "x must be a float", "printf is required first", "No error"], 0], ["Find the error:\nint a[3]; a[3]=10;", ["Index 3 is outside a 3-element array", "Arrays cannot store integers", "a must be a pointer", "No error"], 0], ["Find the error:\nint *p; printf(\"%d\", *p);", ["p is uninitialized before dereferencing", "Pointers cannot be printed", "printf cannot use %d", "No error"], 0], ["Find the error:\nfor(int i=0;i<10;i++); printf(\"%d\", i);", ["i is out of scope after the for declaration", "printf is illegal", "for cannot use int", "No error"], 0]];

function showCTab(name){
  document.querySelectorAll('.c-panel').forEach(x=>x.hidden=true);
  document.getElementById('c-'+name).hidden=false;
  document.querySelectorAll('.c-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.c-tab').forEach(x=>{if(x.textContent.toLowerCase().includes(name==='examples'?'code examples':name==='output'?'predict output':name==='debug'?'find the error':'challenges'))x.classList.add('active')});
  if(name==='output'&&!document.getElementById('output-question').dataset.ready)newOutputQuestion();
  if(name==='debug'&&!document.getElementById('debug-question').dataset.ready)newDebugQuestion();
}
function renderCExample(){
  let key=document.getElementById('c-example-select').value,d=V34_EXAMPLES[key];
  document.getElementById('c-example-code').textContent=d[0];document.getElementById('c-example-explain').textContent=d[1];
}
function copyCode(id){navigator.clipboard?.writeText(document.getElementById(id).textContent).then(()=>alert('Code copied!')).catch(()=>alert('Select and copy the code manually.'))}
function newOutputQuestion(){
  let q=V34_OUTPUT[Math.floor(Math.random()*V34_OUTPUT.length)], box=document.getElementById('output-question');box.dataset.ready='1';
  box.innerHTML=`<div class="output-card"><pre class="output-code">${esc(q[0])}</pre><div class="answer-options">${q[1].map((o,i)=>`<button onclick="checkMini(this,${i===q[2]},'${esc(q[1][q[2]])}')">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div><p class="mini-result"></p></div>`;
}
function newDebugQuestion(){
  let q=V34_DEBUG[Math.floor(Math.random()*V34_DEBUG.length)], box=document.getElementById('debug-question');box.dataset.ready='1';
  box.innerHTML=`<div class="debug-card"><pre class="debug-code">${esc(q[0])}</pre><div class="answer-options">${q[1].map((o,i)=>`<button onclick="checkMini(this,${i===q[2]},'${esc(q[1][q[2]])}')">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div><p class="mini-result"></p></div>`;
}
function checkMini(btn,correct,answer){
  let p=btn.closest('.output-card,.debug-card').querySelector('.mini-result');
  btn.parentElement.querySelectorAll('button').forEach(x=>x.disabled=true);
  p.textContent=correct?'Correct! 🎉':'Not quite. Correct answer: '+answer;
  p.style.color=correct?'#198754':'#c0392b';
}
function showHint(btn,text){btn.insertAdjacentHTML('afterend',`<span class="hint-text"> — ${esc(text)}</span>`)}
const unixFiles={'.':['notes','programs','documents','readme.txt'],notes:['os.txt','c.txt','sad.txt','english.txt','math.txt'],programs:['hello.c','factorial.c'],documents:[]};
let unixPath='~',unixHistory=[];
function terminalKey(e){if(e.key==='Enter'){runCommand(document.getElementById('terminalInput').value);document.getElementById('terminalInput').value=''}}
function terminalWrite(text,cls=''){let t=document.getElementById('terminal'),d=document.createElement('div');d.className='terminal-line '+cls;d.innerHTML=text;t.appendChild(d);t.scrollTop=t.scrollHeight}
function clearTerminal(){document.getElementById('terminal').innerHTML='';terminalWrite('Terminal cleared. Type <b>help</b> for commands.')}
function runCommand(cmd){
 cmd=(cmd||'').trim();if(!cmd)return;unixHistory.push(cmd);terminalWrite(`<span style="color:#8ff0a1">student@bca:${unixPath}$</span> ${esc(cmd)}`);
 let [c,...args]=cmd.split(/\s+/),arg=args.join(' '),out='';
 if(c==='help')out='Commands: pwd, ls, cd, mkdir, cat, grep, echo, whoami, date, ps, kill, chmod, history, man, clear, help';
 else if(c==='pwd')out=unixPath==='~'?'/home/student':`/home/student/${unixPath.replace(/^~\//,'')}`;
 else if(c==='ls'){let key=unixPath==='~'?'.':unixPath.replace('~/','');out=(unixFiles[key]||[]).join('  ')||'(empty directory)'}
 else if(c==='whoami')out='student';
 else if(c==='date')out=new Date().toString();
 else if(c==='echo')out=esc(arg);
 else if(c==='history')out=unixHistory.map((x,i)=>`${i+1}  ${esc(x)}`).join('<br>')||'No history';
 else if(c==='cd'){let target=args[0]||'~';if(target==='..')unixPath=unixPath==='~'?'~':unixPath.split('/').slice(0,-1).join('/')||'~';else if(target==='~')unixPath='~';else if(target==='notes'||target==='programs'||target==='documents')unixPath='~/'+target;else out='bash: cd: '+esc(target)+': No such directory';if(!out)out=''}
 else if(c==='mkdir'){let name=args[0];if(!name)out='mkdir: missing operand';else{let key=unixPath==='~'?'.':unixPath.replace('~/','');unixFiles[key]=unixFiles[key]||[];if(!unixFiles[key].includes(name))unixFiles[key].push(name);out='Directory created: '+esc(name)}}
 else if(c==='cat'){let file=args[0];const content={'readme.txt':'BCA Notes by Shahid','notes/os.txt':'Operating System & Unix notes','notes/c.txt':'Problem Solving & C notes'};let key=(unixPath==='~'?'':unixPath.replace('~/','')+'/')+file;if(content[key])out=content[key];else out='cat: '+esc(file)+': No such file'}
 else if(c==='grep'){out='grep simulator: search command accepted. Example: grep pointer notes/c.txt'}
 else if(c==='ps')out='PID   CMD\\n101   bash\\n214   study-session\\n301   notes-viewer';
 else if(c==='kill')out=args[0]?`Signal sent to simulated PID ${esc(args[0])}.`:'kill: missing PID';
 else if(c==='chmod')out=args.length>=2?`Permissions changed for simulated file ${esc(args[1])}.`:'Usage: chmod MODE FILE';
 else if(c==='man')out=args[0]?`Manual: ${esc(args[0])} — use help and the command cards below to practise.`:'Usage: man COMMAND';
 else if(c==='clear'){clearTerminal();return}
 else out=`bash: ${esc(c)}: command not found`;
 if(out)terminalWrite(out,out.startsWith('bash:')?'terminal-error':'terminal-ok');
}
document.addEventListener('DOMContentLoaded',()=>{renderCExample();});

const V40_TASKS='aku-v40-study-tasks';
function v40Bookmarks(){try{return JSON.parse(localStorage.getItem(BM_KEY)||'[]')}catch(e){return[]}}
function v40Subjects(){
 return [
  ['os','Operating System & Unix'],['c','Problem Solving Technique & Programming in C'],
  ['sad','System Analysis & Design'],['english','Business English'],['math','Mathematics (Numerical Techniques)']
 ];
}
function updateDashboard(){
 const b=v40Bookmarks(), ids=new Set(b.map(x=>x.id));
 const chapters=[...document.querySelectorAll('.chapter')], pct=chapters.length?Math.round(ids.size/chapters.length*100):0;
 const p=document.getElementById('dashProgress'),f=document.getElementById('dashProgressFill'),t=document.getElementById('dashProgressText');
 if(p)p.textContent=pct+'%';if(f)f.style.width=pct+'%';if(t)t.textContent=ids.size?`${ids.size} chapter${ids.size===1?'':'s'} saved — keep going!`:'Save chapters with ⭐ to build your study progress.';
 const saved=document.getElementById('dashSaved');if(saved)saved.textContent=b.length;
 let best=0;['os','c','sad','english','math'].forEach(s=>best=Math.max(best,Number(localStorage.getItem('aku-v32-best-'+s)||0)));
 const bs=document.getElementById('dashBestScore');if(bs)bs.textContent=best+'%';
 const board=document.getElementById('dashboardSubjects');
 if(board)board.innerHTML=v40Subjects().map(([sid,name])=>{
   const sec=document.getElementById(sid), all=sec?[...sec.querySelectorAll('.chapter')]:[], n=all.filter(x=>ids.has(x.id)).length, q=all.length?Math.round(n/all.length*100):0;
   return `<div class="dash-subject"><div class="dash-subject-name">${name}</div><div class="dash-subject-bar"><i style="width:${q}%"></i></div><div class="dash-subject-pct">${q}%</div></div>`;
 }).join('');
}
function saveRecentChapter(id,title){
 localStorage.setItem('aku-v40-recent',JSON.stringify({id,title,at:Date.now()}));
 const c=document.getElementById('continueTitle'),txt=document.getElementById('continueText'),btn=document.getElementById('continueBtn');
 if(c)c.textContent=title;if(txt)txt.textContent='Continue from your last selected chapter.';if(btn){btn.href='#'+id;btn.textContent='▶ Continue →'}
}
function initRecent(){
 try{let r=JSON.parse(localStorage.getItem('aku-v40-recent'));if(r)saveRecentChapter(r.id,r.title)}catch(e){}
 document.querySelectorAll('.chapter').forEach(ch=>{
   const id=ch.id,title=ch.dataset.title||ch.querySelector('h3')?.textContent||'Chapter';
   ch.addEventListener('click',e=>{if(!e.target.closest('button,a'))saveRecentChapter(id,title)});
 });
}
function getTasks(){try{return JSON.parse(localStorage.getItem(V40_TASKS)||'[]')}catch(e){return[]}}
function setTasks(x){localStorage.setItem(V40_TASKS,JSON.stringify(x));renderTasks()}
function addStudyTask(e){e.preventDefault();let input=document.getElementById('newTask'),v=input.value.trim();if(!v)return;let t=getTasks();t.push({id:Date.now(),text:v,done:false});setTasks(t);input.value=''}
function toggleTask(id){let t=getTasks();t.forEach(x=>{if(x.id===id)x.done=!x.done});setTasks(t)}
function deleteTask(id){setTasks(getTasks().filter(x=>x.id!==id))}
function clearCompletedTasks(){setTasks(getTasks().filter(x=>!x.done))}
function renderTasks(){
 const box=document.getElementById('taskList'),t=getTasks();if(!box)return;
 box.innerHTML=t.length?t.map(x=>`<div class="task-row ${x.done?'done':''}"><input type="checkbox" ${x.done?'checked':''} onchange="toggleTask(${x.id})"><label>${esc(x.text)}</label><button class="task-delete" onclick="deleteTask(${x.id})">✕</button></div>`).join(''):'<p style="color:var(--muted)">No tasks yet. Add your first study task above.</p>';
 const done=t.filter(x=>x.done).length,sp=document.getElementById('taskProgress');if(sp)sp.textContent=`${done}/${t.length} completed`;
}
const oldUpdateProgress=updateProgress;
updateProgress=function(){oldUpdateProgress();updateDashboard()};
document.addEventListener('DOMContentLoaded',()=>{renderTasks();initRecent();updateDashboard()});

const V41_REVISION={"os": [["Operating System", "An OS is system software that manages hardware/resources and provides services to applications.", "definition"], ["Process", "A process is a program in execution. Remember: program = passive; process = active.", "definition"], ["Process States", "New → Ready → Running → Waiting/Blocked → Ready → Terminated.", "flow"], ["CPU Scheduling", "Important criteria: CPU utilization, throughput, turnaround time, waiting time and response time.", "list"], ["Round Robin", "Preemptive scheduling using a fixed time quantum; especially useful for interactive systems.", "definition"], ["Deadlock", "Four necessary conditions: mutual exclusion, hold and wait, no preemption, circular wait.", "list"], ["Paging", "Logical memory is divided into pages; physical memory into frames.", "definition"], ["Virtual Memory", "Allows a process to use a large logical address space while only part may be in physical memory.", "definition"], ["Unix Commands", "pwd, ls, cd, mkdir, cp, mv, rm, cat, grep, chmod, ps, kill.", "commands"], ["Permissions", "r = read, w = write, x = execute; chmod changes permission bits.", "commands"]], "c": [["Algorithm", "A finite, unambiguous sequence of steps for solving a problem.", "definition"], ["C Pointer", "A pointer stores a memory address. & obtains an address; * dereferences it.", "definition"], ["Array", "A collection of same-type elements stored in contiguous memory and accessed by index.", "definition"], ["String", "A C string is a character sequence terminated by the null character \\0.", "definition"], ["Recursion", "A function calling itself; it needs a base case.", "definition"], ["Storage Class", "Common storage classes: auto, register, static and extern.", "list"], ["File Handling", "Typical sequence: fopen → read/write → fclose.", "flow"], ["Structures vs Unions", "Structure members have separate storage; union members share the same memory area.", "difference"], ["Bitwise Operators", "& AND, | OR, ^ XOR, ~ NOT, << left shift, >> right shift.", "formula"], ["Debugging", "Finding, diagnosing and correcting defects in a program.", "definition"]], "sad": [["SDLC", "Systems Development Life Cycle: planning → analysis → design → implementation → maintenance.", "flow"], ["Feasibility", "Technical, economic, operational and legal feasibility are key checks.", "list"], ["DFD", "A Data Flow Diagram shows how data moves between external entities, processes and data stores.", "definition"], ["ER Diagram", "Models entities, attributes and relationships for data-oriented design.", "definition"], ["Cohesion", "How closely related the responsibilities inside a module are. Higher cohesion is generally preferred.", "definition"], ["Coupling", "Degree of dependency between modules. Lower unnecessary coupling is generally preferred.", "definition"], ["SRS", "System Requirements Specification documents agreed system requirements.", "definition"], ["Fact Finding", "Interviews, questionnaires, observation, document review and JAD are common techniques.", "list"], ["Prototype", "An early model used to explore and refine requirements with users.", "definition"], ["Audit", "Reviews controls, procedures, evidence and system effectiveness.", "definition"]], "english": [["Formal Email", "Use a meaningful subject, polite greeting, clear body, requested action and professional closing.", "flow"], ["Paraphrasing", "Express the original meaning in new wording without changing the idea.", "definition"], ["Summary", "A concise presentation of the main ideas without unnecessary details.", "definition"], ["Agenda", "A list of items planned for discussion in a meeting.", "definition"], ["Minutes", "An accurate record of meeting proceedings, decisions and action items.", "definition"], ["Inquiry", "A formal request for information or clarification.", "definition"], ["Complaint", "State the problem clearly, provide relevant facts and request a reasonable resolution.", "flow"], ["Proposal", "Presents a plan/recommendation, rationale, method, resources and expected outcome.", "list"], ["Presentation", "Strong structure: opening → key points → evidence/examples → conclusion → questions.", "flow"], ["Listening", "Listen for purpose, key facts and action items; clarify important details.", "list"]], "math": [["Absolute Error", "Absolute error = |true value − approximate value|.", "formula"], ["Relative Error", "Relative error = absolute error / |true value|, when the true value is non-zero.", "formula"], ["Percentage Error", "Percentage error = relative error × 100.", "formula"], ["Bisection", "Requires a bracket where f(a) and f(b) have opposite signs; repeatedly halves the interval.", "definition"], ["Newton-Raphson", "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ).", "formula"], ["Lagrange Interpolation", "Constructs an interpolating polynomial directly from known data points and does not require equal spacing.", "definition"], ["Trapezoidal Rule", "Approximates area by replacing curve segments with trapezoids.", "definition"], ["Simpson's 1/3", "Uses quadratic approximation and requires an even number of subintervals.", "formula"], ["Gauss Elimination", "Transforms a linear system to upper triangular form, then uses back substitution.", "flow"], ["RK4", "Uses four slope estimates k1, k2, k3 and k4 in each step for a first-order ODE.", "list"]]};

const V41_QUESTIONS=[["os", 2, "important", "Define an operating system.", "An operating system is system software that manages computer resources and provides services to application programs."], ["os", 2, "normal", "What is a process?", "A process is a program in execution."], ["os", 5, "important", "Explain the main process states.", "Typical states are New, Ready, Running, Waiting/Blocked and Terminated; explain each state and the transitions between them."], ["os", 5, "important", "Explain the four necessary conditions for deadlock.", "Mutual exclusion, hold and wait, no preemption and circular wait."], ["os", 10, "important", "Explain CPU scheduling and compare FCFS, SJF and Round Robin.", "Discuss scheduling goals, selection rules, preemption, time quantum and major advantages/limitations."], ["os", 10, "normal", "Explain virtual memory and paging.", "Cover logical/physical addresses, pages, frames, page tables, demand paging and page replacement at an introductory level."], ["c", 2, "important", "What is a pointer in C?", "A pointer is a variable that stores a memory address."], ["c", 2, "normal", "What is recursion?", "Recursion is a technique in which a function calls itself and terminates through a base case."], ["c", 5, "important", "Explain arrays and strings in C.", "Explain indexing, contiguous storage, one/two-dimensional arrays and null-terminated character strings."], ["c", 5, "important", "Explain call by value and the role of pointers in modifying data.", "C passes arguments by value; pointers can be used to pass addresses so a function can modify caller data."], ["c", 10, "important", "Explain pointers with examples and pointer arithmetic.", "Cover address/dereference operators, pointer types, arrays and how pointer arithmetic scales with the pointed-to type."], ["c", 10, "normal", "Explain file handling in C.", "Cover FILE pointers, fopen modes, reading/writing, error checking and fclose."], ["sad", 2, "important", "What is SDLC?", "SDLC is a structured life-cycle framework for developing and maintaining information systems."], ["sad", 2, "normal", "What is a DFD?", "A Data Flow Diagram represents movement of data among external entities, processes and data stores."], ["sad", 5, "important", "Explain technical, economic, operational and legal feasibility.", "Explain what each feasibility dimension evaluates before system development proceeds."], ["sad", 5, "important", "Differentiate cohesion and coupling.", "Cohesion measures relatedness within a module; coupling measures dependency between modules. High cohesion and low unnecessary coupling are generally desirable."], ["sad", 10, "important", "Explain SDLC phases in detail.", "Explain planning, analysis, design, implementation and maintenance, including major activities and outputs."], ["sad", 10, "normal", "Explain DFD, ER modelling and decision tables.", "Define each tool, its purpose and where it is useful in structured analysis/design."], ["english", 2, "important", "What is paraphrasing?", "Paraphrasing expresses the same meaning using different wording without changing the original idea."], ["english", 2, "normal", "What are minutes of a meeting?", "Minutes are a formal record of meeting proceedings, decisions and action items."], ["english", 5, "important", "Write the essential parts of a professional email.", "Subject, greeting, clear purpose/body, required action or information, closing and appropriate signature."], ["english", 5, "important", "Explain the difference between an agenda and minutes.", "An agenda lists planned discussion items before a meeting; minutes record what happened, decisions and actions after/during the meeting."], ["english", 10, "important", "Explain principles of effective business communication.", "Discuss clarity, conciseness, correctness, completeness, consideration, tone, audience awareness and appropriate channel."], ["english", 10, "normal", "Explain report, proposal and résumé writing.", "Discuss purpose, organization, audience, essential sections and professional presentation."], ["math", 2, "important", "Define absolute error.", "Absolute error is the absolute difference between the true value and the approximate value."], ["math", 2, "important", "Write the Newton-Raphson formula.", "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)."], ["math", 5, "important", "Explain the bisection method.", "Start with a sign-changing interval, compute midpoint, retain the half containing the sign change, and repeat until the stopping condition is satisfied."], ["math", 5, "important", "Explain the trapezoidal and Simpson's 1/3 rules.", "Give the basic idea, spacing requirements and formulas, and explain how function values are weighted."], ["math", 10, "important", "Explain numerical methods for solving linear equations.", "Discuss Gaussian elimination and an iterative method such as Gauss-Seidel, including steps and convergence considerations."], ["math", 10, "normal", "Explain RK4 for a first-order differential equation.", "Define k1–k4, show the weighted average formula and explain the step-by-step procedure."]];

const V41_NAMES={os:'Operating System & Unix',c:'Problem Solving Technique & Programming in C',sad:'System Analysis & Design',english:'Business English',math:'Mathematics (Numerical Techniques)'};
function renderRevision(){
 const sid=document.getElementById('revisionSubject').value,q=(document.getElementById('revisionSearch').value||'').toLowerCase().trim(),box=document.getElementById('revisionCards');
 let rows=[];Object.entries(V41_REVISION).forEach(([s,arr])=>{if(sid!=='all'&&s!==sid)return;arr.forEach(x=>{if(!q||(x[0]+' '+x[1]).toLowerCase().includes(q))rows.push([s,...x])})});
 box.innerHTML=rows.length?rows.map(([s,title,text,type])=>`<article class="revision-card"><small>${V41_NAMES[s]}</small><h3>${esc(title)}</h3><p>${esc(text)}</p>${type==='formula'?'<span class="rev-tag">FORMULA</span>':type==='flow'?'<span class="rev-tag">PROCESS</span>':type==='commands'?'<span class="rev-tag">COMMANDS</span>':'<span class="rev-tag">KEY POINT</span>'}</article>`).join(''):'<div class="empty-v41">No revision point matched your search.</div>';
}
function renderQuestionBank(){
 const sid=document.getElementById('qbSubject').value,marks=document.getElementById('qbMarks').value,type=document.getElementById('qbType').value,box=document.getElementById('questionCards');
 let rows=V41_QUESTIONS.filter(x=>(sid==='all'||x[0]===sid)&&(marks==='all'||String(x[1])===marks)&&(type==='all'||x[2]===type));
 box.innerHTML=rows.length?rows.map((x,i)=>`<article class="question-card"><div class="q-meta"><span>${V41_NAMES[x[0]]}</span><b>${x[1]} Marks</b>${x[2]==='important'?'<em>⭐ Important</em>':''}</div><h3>${esc(x[3])}</h3><button onclick="toggleAnswer(this)">Show Answer</button><div class="hidden-answer">${esc(x[4])}</div></article>`).join(''):'<div class="empty-v41">No questions match these filters.</div>';
}
function toggleAnswer(btn){let a=btn.nextElementSibling;a.classList.toggle('open');btn.textContent=a.classList.contains('open')?'Hide Answer':'Show Answer'}
document.addEventListener('DOMContentLoaded',()=>{renderRevision();renderQuestionBank()});

const V42_KEY='aku-v42-attempts';
const V42_NAMES={os:'Operating System & Unix',c:'Problem Solving Technique & Programming in C',sad:'System Analysis & Design',english:'Business English',math:'Mathematics (Numerical Techniques)'};
function v42Get(){try{return JSON.parse(localStorage.getItem(V42_KEY)||'[]')}catch(e){return[]}}
function v42RecordAttempt(subject,pct,score,total){
  let a=v42Get();a.unshift({subject,pct,score,total,time:Date.now()});a=a.slice(0,50);localStorage.setItem(V42_KEY,JSON.stringify(a));updateAnalytics();
}
function clearAnalytics(){if(confirm('Clear saved quiz results?')){localStorage.removeItem(V42_KEY);updateAnalytics()}}
function updateAnalytics(){
  const a=v42Get(), b=v40Bookmarks? v40Bookmarks():[];
  let best=0;Object.keys(V42_NAMES).forEach(s=>best=Math.max(best,Number(localStorage.getItem('aku-v32-best-'+s)||0)));
  let avg=a.length?Math.round(a.reduce((s,x)=>s+x.pct,0)/a.length):0;
  const set=(id,val)=>{let e=document.getElementById(id);if(e)e.textContent=val};
  set('statQuizzes',a.length);set('statBest',best+'%');set('statAverage',avg+'%');set('statSaved',b.length);
  let box=document.getElementById('subjectAnalytics');
  if(box)box.innerHTML=Object.entries(V42_NAMES).map(([s,n])=>{
    let rows=a.filter(x=>x.subject===s),bp=rows.length?Math.max(...rows.map(x=>x.pct)):Number(localStorage.getItem('aku-v32-best-'+s)||0);
    return `<div class="subject-stat"><div class="subject-stat-name">${n}</div><div class="subject-stat-bar"><i style="width:${bp}%"></i></div><div class="subject-stat-pct">${bp}%</div></div>`;
  }).join('');
  let rb=document.getElementById('recentResults');
  if(rb)rb.innerHTML=a.length?a.slice(0,6).map(x=>`<div class="result-item-v42"><div><b>${V42_NAMES[x.subject]}</b><small>${new Date(x.time).toLocaleString()} · ${x.score}/${x.total}</small></div><span class="result-percent">${x.pct}%</span></div>`).join(''):'<div class="empty-v42">No quiz attempts yet. Complete an Exam Mode quiz to see your results here.</div>';
  updateAchievements(a,best);
}
function updateAchievements(attempts,best){
 const saved=(v40Bookmarks?v40Bookmarks():[]).length, chapters=document.querySelectorAll('.chapter').length, prog=chapters?Math.round(saved/chapters*100):0;
 const defs=[
  ['first','🎯','First Quiz','Complete your first Exam Mode quiz.',attempts.length>=1],
  ['five','🔥','Quiz Streak','Complete 5 quizzes.',attempts.length>=5],
  ['eighty','🏆','80% Club','Score 80% or higher in any quiz.',best>=80],
  ['ninety','💎','90% Master','Score 90% or higher in any quiz.',best>=90],
  ['perfect','👑','Perfect Score','Get 100% in a quiz.',best>=100],
  ['saved5','⭐','Revision Builder','Save 5 chapters.',saved>=5],
  ['saved10','📚','Serious Student','Save 10 chapters.',saved>=10],
  ['allsubjects','🌟','Five Subject Explorer','Complete at least one quiz in every subject.',Object.keys(V42_NAMES).every(s=>attempts.some(x=>x.subject===s))],
  ['planner','📅','Study Planner','Add a task to your daily study plan.',getTasks().length>=1],
  ['progress50','🚀','Halfway There','Save chapters covering at least 50% of the notes.',prog>=50]
 ];
 const unlocked=defs.filter(x=>x[4]).length;const c=document.getElementById('achievementCount');if(c)c.textContent=unlocked+' unlocked';
 const box=document.getElementById('achievementGrid');
 if(box)box.innerHTML=defs.map(x=>`<article class="badge ${x[4]?'unlocked':''}"><div class="badge-icon">${x[1]}</div><h4>${x[2]}</h4><p>${x[3]}</p><small>${x[4]?'✓ Unlocked':'🔒 Locked'}</small></article>`).join('');
}
document.addEventListener('DOMContentLoaded',()=>{updateAnalytics()});

const V43_FOCUS_KEY='aku-v43-focus';
let v43Focus={minutes:25,remaining:1500,running:false,timer:null,sessionStart:0};
function v43LoadFocus(){
 try{let s=JSON.parse(localStorage.getItem(V43_FOCUS_KEY)||'{}');if(s.goal!==undefined)document.getElementById('focusGoal').value=s.goal||'';if(s.sessions)v43Focus.sessions=s.sessions;if(s.minutes)v43Focus.minutes=s.minutes;}catch(e){}
 v43Focus.remaining=(v43Focus.minutes||25)*60;v43UpdateFocus();
}
function v43SaveFocus(){
 localStorage.setItem(V43_FOCUS_KEY,JSON.stringify({goal:document.getElementById('focusGoal')?.value||'',sessions:v43Focus.sessions||0,minutes:v43Focus.minutes||25}));
}
function v43FocusStats(){let s=JSON.parse(localStorage.getItem(V43_FOCUS_KEY)||'{}');return{s:s.sessions||0,m:s.totalMinutes||0,t:s.todayMinutes||0,date:s.date||''}}
function v43RenderStats(){let x=v43FocusStats();if(document.getElementById('focusSessions'))document.getElementById('focusSessions').textContent=x.s;if(document.getElementById('focusMinutes'))document.getElementById('focusMinutes').textContent=x.m;if(document.getElementById('focusToday'))document.getElementById('focusToday').textContent=x.t}
function v43UpdateFocus(){
 let r=Math.max(0,v43Focus.remaining),m=Math.floor(r/60),s=r%60;
 const timer=document.getElementById('focusTimer');if(timer)timer.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
 const total=(v43Focus.minutes||25)*60,p=document.getElementById('focusProgressFill');if(p)p.style.width=((total-r)/total*100)+'%';
 const label=document.getElementById('focusSessionLabel');if(label)label.textContent=v43Focus.running?'Stay focused — you are doing great.':'Focus Session';
}
function setFocusMinutes(min){
 if(v43Focus.running)return;
 v43Focus.minutes=min;v43Focus.remaining=min*60;
 document.querySelectorAll('.focus-presets button').forEach(b=>b.classList.toggle('selected',b.textContent.startsWith(min+' ')));
 v43UpdateFocus();v43SaveFocus();
}
function focusStart(){
 if(v43Focus.running)return;
 v43Focus.running=true;v43Focus.sessionStart=Date.now();
 document.body.classList.add('focus-running');
 const st=document.getElementById('focusStatus');if(st)st.textContent='Focused session running';
 const btn=document.getElementById('focusStartBtn');if(btn)btn.textContent='▶ Running';
 clearInterval(v43Focus.timer);v43Focus.timer=setInterval(()=>{v43Focus.remaining--;v43UpdateFocus();if(v43Focus.remaining<=0)focusFinish()},1000);
}
function focusPause(){
 if(!v43Focus.running)return;
 v43Focus.running=false;clearInterval(v43Focus.timer);document.body.classList.remove('focus-running');
 const st=document.getElementById('focusStatus');if(st)st.textContent='Paused';
 const btn=document.getElementById('focusStartBtn');if(btn)btn.textContent='▶ Resume';
}
function focusReset(){
 clearInterval(v43Focus.timer);v43Focus.running=false;document.body.classList.remove('focus-running');
 v43Focus.remaining=(v43Focus.minutes||25)*60;v43UpdateFocus();
 const st=document.getElementById('focusStatus');if(st)st.textContent='Ready to study';
 const btn=document.getElementById('focusStartBtn');if(btn)btn.textContent='▶ Start';
}
function focusFinish(){
 clearInterval(v43Focus.timer);v43Focus.running=false;document.body.classList.remove('focus-running');
 let data=v43FocusStats(),today=new Date().toISOString().slice(0,10);if(data.date!==today)data.t=0;
 data.s++;data.m+=v43Focus.minutes;data.t+=v43Focus.minutes;data.date=today;
 localStorage.setItem(V43_FOCUS_KEY,JSON.stringify({goal:document.getElementById('focusGoal')?.value||'',sessions:data.s,totalMinutes:data.m,todayMinutes:data.t,date:data.date,minutes:v43Focus.minutes}));
 v43Focus.remaining=v43Focus.minutes*60;v43UpdateFocus();v43RenderStats();
 const st=document.getElementById('focusStatus');if(st)st.textContent='Session complete 🎉';
 document.getElementById('focus-mode')?.classList.add('focus-complete');setTimeout(()=>document.getElementById('focus-mode')?.classList.remove('focus-complete'),900);
 v43Toast('Focus session complete! Great work. 🎉');
}
function v43Toast(msg){let t=document.getElementById('toastV43');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window.v43ToastTimer);window.v43ToastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
window.addEventListener('scroll',()=>{document.getElementById('backTopV43')?.classList.toggle('show',window.scrollY>500)});
document.addEventListener('DOMContentLoaded',()=>{
 v43LoadFocus();v43RenderStats();
 const g=document.getElementById('focusGoal');if(g)g.addEventListener('input',v43SaveFocus);
});

let v5InstallPrompt=null,v5Selected=0;
const V5_ACTIONS=[
 {icon:'🏠',title:'Dashboard',sub:'Open your study dashboard',href:'#dashboard'},
 {icon:'📚',title:'Subjects',sub:'Browse all five Semester II subjects',href:'#subjects'},
 {icon:'⚡',title:'Quick Revision',sub:'Fast exam revision cards',href:'#revision'},
 {icon:'📝',title:'Question Bank',sub:'2, 5 and 10-mark questions',href:'#question-bank'},
 {icon:'🧠',title:'Exam Mode',sub:'Timed MCQ practice',href:'#exam-mode'},
 {icon:'📊',title:'Performance',sub:'Scores and achievements',href:'#analytics'},
 {icon:'📐',title:'Numerical Lab',sub:'Numerical Techniques calculators',href:'#numerical-lab'},
 {icon:'💻',title:'C Programming Lab',sub:'C practice and challenges',href:'#c-lab'},
 {icon:'🖥️',title:'Unix Simulator',sub:'Practise Unix commands',href:'#unix-lab'},
 {icon:'📌',title:'Formula Sheet',sub:'Formulas and quick references',href:'#formula-sheet'},
 {icon:'✍️',title:'Important Answers',sub:'Exam answer frameworks',href:'#important-answers'},
 {icon:'🎯',title:'Focus Mode',sub:'Distraction-free study timer',href:'#focus-mode'},
 {icon:'📅',title:'Study Planner',sub:'Daily checklist',href:'#planner'}
];
function openV5Palette(){const p=document.getElementById('v5Palette');if(!p)return;p.hidden=false;v5Selected=0;document.getElementById('v5Search').value='';renderV5Results();setTimeout(()=>document.getElementById('v5Search').focus(),30)}
function closeV5Palette(){let p=document.getElementById('v5Palette');if(p)p.hidden=true}
function renderV5Results(){
 const q=(document.getElementById('v5Search')?.value||'').toLowerCase().trim();
 const rows=V5_ACTIONS.filter(x=>(x.title+' '+x.sub).toLowerCase().includes(q));
 v5Selected=Math.min(v5Selected,Math.max(0,rows.length-1));
 const box=document.getElementById('v5Results');if(!box)return;
 box.innerHTML=rows.map((x,i)=>`<div class="palette-result ${i===v5Selected?'selected':''}" onclick="v5Go('${x.href}')"><span class="picon">${x.icon}</span><div><b>${x.title}</b><small>${x.sub}</small></div><span>→</span></div>`).join('')||'<div class="empty-v44" style="margin:15px">No study tool found.</div>';
}
function v5Go(href){closeV5Palette();setTimeout(()=>location.hash=href.replace('#',''),0)}
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openV5Palette()}
 const p=document.getElementById('v5Palette');if(!p||p.hidden)return;
 if(e.key==='Escape')closeV5Palette();
 if(e.key==='ArrowDown'){e.preventDefault();v5Selected++;renderV5Results()}
 if(e.key==='ArrowUp'){e.preventDefault();v5Selected--;if(v5Selected<0)v5Selected=0;renderV5Results()}
 if(e.key==='Enter'){e.preventDefault();const rows=V5_ACTIONS.filter(x=>(document.getElementById('v5Search').value||'').toLowerCase().trim()===''||(x.title+' '+x.sub).toLowerCase().includes((document.getElementById('v5Search').value||'').toLowerCase().trim()));if(rows[v5Selected])v5Go(rows[v5Selected].href)}
});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();v5InstallPrompt=e;const b=document.getElementById('installBtn'),t=document.getElementById('installText');if(b)b.textContent='Install App';if(t)t.textContent='Ready to install on this device.'});
async function v5Install(){
 if(v5InstallPrompt){v5InstallPrompt.prompt();const r=await v5InstallPrompt.userChoice;v5InstallPrompt=null;v5Toast(r.outcome==='accepted'?'App installation started.':'Installation cancelled.');return}
 v5Toast('If Install is unavailable, use your browser menu → Add to Home screen. Serve the site from a web server for full PWA support.');
}
function v5UpdateOnline(){
 const online=navigator.onLine,box=document.querySelector('.online-status'),text=document.getElementById('onlineText'),desc=document.getElementById('offlineText');
 if(box)box.classList.toggle('online',online),box.classList.toggle('offline',!online);
 if(text)text.textContent=online?'Online':'Offline';
 if(desc)desc.textContent=online?'Online now. Previously cached resources remain available for offline study when supported.':'You are offline. Cached portal resources may still work.';
}
window.addEventListener('online',v5UpdateOnline);window.addEventListener('offline',v5UpdateOnline);
document.addEventListener('DOMContentLoaded',()=>{
 v5UpdateOnline();
 if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
});

/* V6.0 final polish */
function shareSite(){
  const data={title:'BCA Notes by Shahid — AKU Semester II',text:'AKU BCA Semester II notes, revision and practice tools.',url:location.href};
  if(navigator.share){navigator.share(data).catch(()=>{});}
  else if(navigator.clipboard){navigator.clipboard.writeText(location.href).then(()=>v5Toast('Website link copied.')).catch(()=>v5Toast('Copy the URL from your browser address bar.'));}
  else{v5Toast('Copy the URL from your browser address bar.');}
}
function showPyqNotice(year){
  v5Toast(`PYQ ${year}: add the exact verified paper before publishing it as an official AKU paper.`);
}
(function(){
  try{
    const saved=localStorage.getItem('bca-theme');
    if(saved==='dark' && !document.body.classList.contains('dark')) document.body.classList.add('dark');
  }catch(e){}
})();
const oldToggleTheme=window.toggleTheme;
window.toggleTheme=function(){
  if(typeof oldToggleTheme==='function') oldToggleTheme();
  try{localStorage.setItem('bca-theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}
};
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav')?.classList.remove('open')));
});

(function(){
  const n=document.getElementById('nav');
  window.toggleNav=function(){if(n)n.classList.toggle('open');};
})();
