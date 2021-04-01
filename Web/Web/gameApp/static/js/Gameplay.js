const img = document.querySelector("#game-person");
const btn1 = document.querySelector("#button-1");
const btn2 = document.querySelector("#button-2");
const btn3 = document.querySelector("#button-3");
const btn4 = document.querySelector("#button-4");
const disp = document.querySelector("#game-display");

const _timeoutToIdle = 3000;

var isGameOver = false;
var totalScore = 0;
var idleImgPath = "/static/gameApp/images/lower_idle.png";
var idleTimer;
var buttonScores = [1, 1, -1, -1];
var buttons = [btn1, btn2, btn3, btn4];

function ButtonClickListener(id)
{
    if (buttonScores[id] > 0)
    {
        isGameOver = AnswerCorrect(id);
    }
    else
    {
        isGameOver = AnswerWrong(id);
    }

    Animate();

    if (!isGameOver)
    {
        buttons[id].style.visibility = "hidden";

        var spawnTimes = Random(1, 4);
        for (var i = 0; i < spawnTimes; i++)
        {
            get_JSON();

        }
    }
}

btn1.addEventListener("click", function(){ButtonClickListener(0)});
btn2.addEventListener("click", function(){ButtonClickListener(1)});
btn3.addEventListener("click", function(){ButtonClickListener(2)});
btn4.addEventListener("click", function(){ButtonClickListener(3)});

function Animate()
{
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() =>
        {
            if (!isGameOver)
            {
                img.src = idleImgPath;
                disp.textContent = "";
                clearTimeout(idleTimer);
            }
        }
    , _timeoutToIdle);
}

function get_JSON()
{
    var rez = new XMLHttpRequest();
    rez.open ('GET', 'http://127.0.0.1:8000/game/posts-json')
    rez.onload = function()  {
    var Data = JSON.parse(rez.responseText);
    renderHTML(Data);

};
rez.send();
}

function renderHTML(data)
{
    var str = "";
    var ran = Random(0,5);
    str = data.data[ran].text;
    console.log(str);
    SpawnNewButton(str);

}

function SpawnNewButton(str)
{

    // делаем запрос к серверу, чтобы получить текст и оценку действия
    var score = Random(0, 1);
    if (score == 0) score = -1;
    var text = str + score * Random(100, 999);

    var id = Random(0, 3);
    buttonScores[id] = score;
    buttons[id].textContent = text;
    buttons[id].style.visibility = "visible";
}

function AnswerCorrect(id)
{
    totalScore += buttonScores[id];

    if (totalScore >= 15)
    {
        Victory();
        return true;
    }
    else
    {
        if (totalScore >= 10)
        {
            img.src = "/static/gameApp/images/senior_correct.png";
        }
        else
        {
            if (totalScore >= 5)
            {
                img.src = "/static/gameApp/images/middle_correct.png";
            }
            else
            {
                img.src = "/static/gameApp/images/lower_correct.png";
            }
        }
    }

    if (totalScore == 5)
    {
        disp.textContent = "Ура! Петю повысили!";
        idleImgPath = "/static/gameApp/images/middle_idle.png";
    }
    else if (totalScore == 10)
    {
        disp.textContent = "Ура! Петю повысили!";
        idleImgPath = "/static/gameApp/images/senior_idle.png";
    }

    return false;
}

function AnswerWrong(id)
{
    if (totalScore == 5)
    {
        disp.textContent = "О нет! Петю понизили...";
        idleImgPath = "/static/gameApp/images/lower_idle.png";
    }
    else if (totalScore == 10)
    {
        disp.textContent = "О нет! Петю понизили...";
        idleImgPath = "/static/gameApp/images/middle_idle.png";
    }

    totalScore += buttonScores[id];

    if (totalScore < -2)
    {
        Deffeat();
        return true;
    }
    else
    {
        if (totalScore < 5)
        {
            img.src = "/static/gameApp/images/lower_wrong.png";
        }
        else
        {
            if (totalScore < 10)
            {
                img.src = "/static/gameApp/images/middle_wrong.png";
            }
            else
            {
                img.src = "/static/gameApp/images/senior_wrong.png";
            }
        }
    }

    return false;
}

function Victory()
{
    disp.textContent = "Отлично! Петя поднялся по карьерной лестнице!";

    buttons.forEach(function(item)
        {
            item.style.visibility = "hidden";
        }
    );
}

function Deffeat()
{
    disp.textContent = "Кошмар! Петю уволили...";

    buttons.forEach(function(item)
        {
            item.style.visibility = "hidden";
        }
    );
}

function Random(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}