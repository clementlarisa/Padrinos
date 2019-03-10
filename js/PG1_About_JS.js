document.addEventListener('DOMContentLoaded', init, false);
function init() {
    setOtherPagePosition();
    let v = document.getElementsByClassName("section_toggle");
    let i;
    for (i = 0; i < v.length; i++) {
        v[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let section_content = this.nextElementSibling;
            if (section_content.style.display === "block") {
                section_content.style.display = "none";
            } else {
                section_content.style.display = "block";
            }
        });
    }
}

