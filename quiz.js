const Q=[
["os","Which component manages processes and system resources?",["Operating System","Text editor","Web browser","Keyboard"],0],
["os","Which Unix command lists files?",["cd","ls","pwd","mkdir"],1],
["os","A process waiting for an event is generally in which state?",["Running","Ready","Waiting/Blocked","Terminated"],2],
["c","Which symbol gets the address of a variable in C?",["*","&","#","@"],1],
["c","Which loop executes its body at least once?",["for","while","do-while","if"],2],
["c","Which data structure follows LIFO?",["Queue","Stack","Array","Graph"],1],
["sad","The main purpose of system analysis is to:",["Understand requirements","Write CSS","Install software","Design logos"],0],
["sad","Which diagram represents movement of data through a system?",["DFD","Pie chart","Histogram","Logo"],0],
["english","Which is a quality of effective business communication?",["Clarity","Ambiguity","Redundancy","Ignoring audience"],0],
["english","A concise formal message mainly improves:",["Confusion","Clarity","Noise","Redundancy"],1],
["math","Increase from 100 to 120 equals:",["10%","15%","20%","25%"],2],
["math","Average of 10, 20 and 30 is:",["15","20","25","30"],1],
["math","120 km in 3 hours gives speed:",["30 km/h","40 km/h","60 km/h","90 km/h"],1],
["math","Probability of a certain event is:",["0","0.5","1","2"],2],
["c","Which keyword defines a constant type qualifier?",["fixed","const","constant","static"],1],
["os","Which Unix command prints current working directory?",["pwd","who","cat","touch"],0],
["sad","A feasibility study checks whether a proposed system is:",["Possible and worthwhile","Already installed","A language","A table"],0],
["english","Which is a common communication barrier?",["Feedback","Clarity","Semantic misunderstanding","Active listening"],2],
["math","If CP=₹500 and SP=₹600, profit is:",["₹50","₹100","₹150","₹200"],1],
["os","The kernel is a core part of the:",["Operating System","Keyboard","Monitor","Browser"],0]
];
const N={os:"Operating System & Unix",c:"Problem Solving & Programming in C",sad:"System Analysis & Design",english:"Business English",math:"Mathematics (Numerical Techniques)"};
let quiz=[],i=0,ans=null,score=0,wrong=[],left=600,timer;
const $=x=>document.getElementById(x);
function stats(){$("attempts").textContent=localStorage.bcaAttempts||0;$("best").textContent=(localStorage.bcaBest||0)+"%";$("last").textContent=localStorage.bcaLast?(localStorage.bcaLast+"%"):"—"}
function sh(a){return [...a].sort(()=>Math.random()-.5)}
function start(){let s=$("subject").value,p=Q.filter(x=>s=="all"||x[0]==s);quiz=($("shuffle").checked?sh(p):p).slice(0,10);i=0;score=0;wrong=[];left=600;$("start").classList.add("hidden");$("result").classList.add("hidden");$("quiz").classList.remove("hidden");clearInterval(timer);timer=setInterval(()=>{left--;clock();if(left<=0)finish()},1000);show()}
function clock(){let m=String(Math.floor(left/60)).padStart(2,"0"),s=String(left%60).padStart(2,"0");$("timer").textContent=m+":"+s}
function show(){ans=null;$("next").disabled=true;let q=quiz[i];$("count").textContent=`Question ${i+1} of ${quiz.length}`;$("bar").style.width=(i/quiz.length*100)+"%";$("sub").textContent=N[q[0]];$("question").textContent=q[1];$("options").innerHTML=q[2].map((x,n)=>`<button class="opt" data-n="${n}">${String.fromCharCode(65+n)}. ${x}</button>`).join("");document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{ans=+b.dataset.n;document.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");$("next").disabled=false});clock()}
$("next").onclick=()=>{let q=quiz[i];if(ans===q[3])score++;else wrong.push([q[1],q[2][q[3]],ans==null?"Not answered":q[2][ans]]);i++;if(i>=quiz.length)finish();else show()}
function finish(){clearInterval(timer);let pct=Math.round(score/quiz.length*100),a=+(localStorage.bcaAttempts||0)+1,b=Math.max(pct,+(localStorage.bcaBest||0));localStorage.bcaAttempts=a;localStorage.bcaBest=b;localStorage.bcaLast=pct;$("quiz").classList.add("hidden");$("result").classList.remove("hidden");$("score").textContent=pct+"%";$("title").textContent=pct>=80?"Excellent! 🔥":pct>=50?"Good job! 💪":"Keep practicing! 📚";$("summary").textContent=`You scored ${score} out of ${quiz.length}. ${wrong.length} question(s) need revision.`;$("review").innerHTML=wrong.length?"<h3>Review Wrong Answers</h3>"+wrong.map((x,n)=>`<div class="review"><b>${n+1}. ${x[0]}</b><br><small>Your answer: ${x[2]}<br>Correct answer: ${x[1]}</small></div>`).join(""):"<div class='review'>🎉 Perfect score!</div>";stats()}
$("startBtn").onclick=start;$("retry").onclick=start;stats();