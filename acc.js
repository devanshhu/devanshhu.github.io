var main_inf;
var i = 0;


window.onload = function () {
    document.getElementById('nav').style.maxHeight = "13%";

    var isMobile= false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);

    isMobile = (window.orientation > -1);

  if( $(window).width() < 800 || isMobile)
    {
        renderMobile();
    }
    setTimeout(() => {
        document.getElementById('salutation-text').style.display = "block";
        document.getElementById('main-inf').style.display = "block";
        writerEffect();
    }, 1000);   
}
window.onscroll = scrollOccured;
function scrollOccured()
{
    headerToggle();
    revealProjects();
    checkTabs();
}

function renderMobile()
{
    document.getElementById('home').style.display = "none";
    document.getElementById('project').style.display = "none";
    document.getElementById('contact').style.display = "none";
    // document.getElementsByClassName('extras')[0].style.display="none";
    document.getElementById('brief-info').style.width = "80%";
    document.getElementsByClassName('head-text')[0].style.width="700px";
    document.getElementsByClassName('extras')[0].style.display="600px";
    document.getElementById('brief-info').style.margin= "auto";
    var el = document.getElementsByClassName('skill');
     for (var i =0;i < el.length ;i++)
     {
        el[i].style.width = "80%";
        el[i].style.margin = "auto";
     }

     var links = document.getElementsByClassName('code-link');
     for (var i =0;i < links.length ;i++)
     {
        links[i].style.display = "flex" ;
     }
      document.getElementsByClassName('accounts')[0].style.width = "98%";
      document.getElementsByClassName('accounts')[0].style.margin= "auto";
      revealProjects();
}

function writerEffect() {
    var text = "I love to code and solving puzzles and logical brain teasing activities are among my hobbies. " +
        " I like playing cricket , watching movies and cartoon shows in free time."
    if (i < text.length) {
        document.getElementById('main-inf').innerHTML += text.charAt(i);
        i++;
        setTimeout(writerEffect, 40);
        if (i == text.length) {
            $('#main-inf').append('<span id="cursor">|</span>');
            showSkills();
        }
    }
}

function showSkills() {
    document.getElementById('skills').style.display = "block";
    document.getElementById('skills').style.visibility = 'visible';

    setTimeout(() => {
        document.getElementById('skill-wrap').style.display = "block";
        document.getElementById('skill-wrap').style.visibility = "visible";

    }, 1000)
    setTimeout(() => {
        showIndividualSkills();
    }, 1200);
}
function showIndividualSkills() {
    document.getElementById('java').style.display = "block";
    document.getElementById('java').style.visibility = "visible";

    document.getElementById('python').style.display = "block";
    document.getElementById('python').style.visibility = "visible";

    document.getElementById('ng').style.display = "block";
    document.getElementById('ng').style.visibility = "visible";

    document.getElementById('dotnet').style.display = "block";
    document.getElementById('dotnet').style.visibility = "visible";

    document.getElementById('html').style.display = "block";
    document.getElementById('html').style.visibility = "visible";

    document.getElementById('css').style.display = "block";
    document.getElementById('css').style.visibility = "visible";

    document.getElementById('sql-server').style.display = "block";
    document.getElementById('sql-server').style.visibility = "visible";
    
    document.getElementById('django').style.display = "block";
    document.getElementById('django').style.visibility = "visible";
    setTimeout(() => {
        changeWidth();
    }, 100);
}

function changeWidth() {

    document.getElementById('java').style.width = "70%";

    document.getElementById('python').style.width = "40%";

    document.getElementById('ng').style.width = "60%";

    document.getElementById('dotnet').style.width = "40%";

    document.getElementById('html').style.width = "80%";

    document.getElementById('css').style.width = "65%";

    document.getElementById('django').style.width = "45%";

    document.getElementById('sql-server').style.width = "35%";

    setTimeout(() => {
        showProjects();
        setTimeout(() => {
          showContactDetails();
        }, 1200); 
    }, 1000);
}

function showProjects()
{
    document.getElementById('home').classList.add('selected');
    document.getElementById('project-container').style.display = "flex";
    document.getElementById('sal-project').style.display = "flex";
    // document.getElementById('many-more').style.display = 'flex';
}
function headerToggle()
{
    var nav = document.getElementById('nav');
    var navheight = nav.offsetTop;
    // var salHeight = document.getElementById('salutation-text').offsetTop;
    if(window.pageYOffset > navheight )
    {
        nav.classList.add('head-pos');
        
        document.getElementById('home').classList.add('selected');
        
        document.getElementById('home-container').classList.add('pad-top');
    }
    else
    {
        document.getElementById('home-container').classList.remove('pad-top');
        nav.classList.remove('head-pos');
    }
}

function revealProjects()
{
    var h = document.getElementById('sal-project').offsetTop;
    if(window.pageYOffset > h -500)
    {
        var el = document.getElementsByClassName('card');
        if(el.length > 0 )
        for (var i =0 ; i< el.length ; i++ )
        {
            el[i].style.display = "flex";
        }
    document.getElementById('many-more').style.display = 'flex';
    }  
}

function showLink(event)
{
    event.getElementsByClassName('code-link')[0].style.display = "flex";
}
function hideLink(event)
{
    event.getElementsByClassName('code-link')[0].style.display = "none";
}

function scrollToElement(el)
{
    $(document.body).animate({
        'scrollTop':   $(el).offset().top
    }, 700);
}


function showContactDetails()
{
    document.getElementById('sal-contact').style.display = "flex" ;
    var el  = document.getElementsByClassName('account');
    for(var i =0;i< el.length ;i++)
    {
        displayEl(el[i]);
    }
    
}

function displayEl(el)
{
    setTimeout(()=>
{
    el.style.display = "flex";

},1000);
}
function checkTabs()
{
    var project = document.getElementById('project');
    var projectLocation = document.getElementById('project-container').offsetTop;
    var projectheight = $('#project-container').height();
    var homeheight = $('#home-container').height();
    var contact = document.getElementById('contact');
    var contactLocation = document.getElementById('contact-container').offsetTop;
    var home = document.getElementById('home');
    var homeLocation = document.getElementById('home-container').offsetTop;
    var topP = window.pageYOffset;

    if( topP  < (homeLocation + (homeheight/2)) )
    {
        home.classList.add('selected');
        project.classList.remove('selected');
        contact.classList.remove('selected');
    }
    else if( topP  > (homeLocation + (homeheight/2)) && topP < (projectLocation + projectheight/2) )
        {
            home.classList.remove('selected');
            project.classList.add('selected');
            contact.classList.remove('selected');
           
        }
    else 
    {
      home.classList.remove('selected');
      project.classList.remove('selected');
      contact.classList.add('selected');
    }
}

function routeToInstagram()
{
    window.location = "https://www.instagram.com/devanshhu"
}
function routeToFacebook()
{
    window.location = "http://www.facebook.com/devansh.upadhyay.35"; 
}
function routeToLinkedIn()
{
    window.location = "http://www.linkedin.com/in/devanshhu";
}
function routeToGithub()
{
    window.location = "http://www.github.com/devanshhu";
}
function openMail()
{
    window.location = "mailto:devanshu9719@gmail.com";
}
function routeToPolitics(end)
{
    window.location = "http://www.thepolitics.in/"+end;
}

function routeToRepo(reponame)
{
    window.location = "http://github.com/devanshhu/"+reponame;
}