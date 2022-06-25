let questionArray = [];
let i = 0;
let answers = [];
let counter = 0;

//setting your quiz

$('#start').click(async function difficulty() {
    let value = $("input[type=radio][name=difficulty]:checked").val();
    var category = $("#selector option:selected").val();
    let questionsNumber = $('#questionsNumber').val();
    let response = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${questionsNumber}&difficulty=${value}`);
    questionArray = await response.json();

    display();
    $("#setting").fadeOut("500");
    $("#questions").fadeIn("500");
});



//your quiz page
function display() {

    $('#currentNo').text(i + 1);
    $('#totalNo').text($('#questionsNumber').val());
    $('#question').text(questionArray[i].question);
    let answers = [questionArray[i].correctAnswer, ...questionArray[i].incorrectAnswers];
    console.log(answers);

    //to display an array in arandom way
    let ranNums = [],
        l = answers.length,
        k = 0;

    while (l--) {
        k = Math.floor(Math.random() * (l + 1));
        ranNums.push(answers[k]);
        answers.splice(k, 1);
    }
    console.log(ranNums);


    //to display answers
    let Container = '';
    for (var j = 0; j < ranNums.length; j++) {

        Container += `
            <div class="choices">
           
            <label id="frist" for="fChoice"> 
            <input type="radio"  name="Choice" value=${ranNums[j]}>${ranNums[j]}
            </label>
            </div>
         `


    }

    $('#choicesContainer').html(Container);
}


//move to next question
$('#submitBtn').click(function submit() {

    end();
    checkValue()
}
)
//check the answer true or not 

function checkValue() {
    let value = $("input[type=radio][name=Choice]:checked").val();
    let correctValue = questionArray[i].correctAnswer;


    if (value == null) {

        $("#pChoose").fadeIn("500");



    }
    else {

        $("#pChoose").fadeOut("300");
        if (value == correctValue) {


            console.log('correct')
            $("#correct").fadeIn("500");
            $("#correct").fadeOut("500");
            counter++;
        }
        else {
            $("#incorrect").fadeIn("500");
            $("#incorrect").fadeOut("500");
            console.log('incorrect')
        }
        i++
        display();
    }
}

//as you end your quiz you will get your score
function end() {
    let questionsNumber = $('#questionsNumber').val();
    if (i == questionsNumber - 1) {
        $("#questions").fadeOut("500");
        $("#finish").fadeIn("500");
        $('#counte').text(counter);
    }

}
//retry new quiz
$('#tryAgain').click(function () {
    $("#finish").fadeOut("500");
    $("#setting").fadeIn("500");
    i = 0;
    document.getElementById('questionsNumber').value = "";
    difficulty();
})





