document.write('    <nav class="wrapper">\n' +
    '        <div id="menu_bttn_div">\n' +
    '            <a onclick="myFunction()">\n' +
    '                <img id="menu_bttn" src="../img/menu_icon.png" alt="Menu button" title="Menu button"/>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '        <div id="logo_div"><a href="../html/PG1_About.html"><img id="logo" src="../img/logo.png" alt="Padrino\'s" title="Padrino\'s"/></a>\n' +
    '        </div>\n' +
    '        <ul id="myTopnav" class="topnav">\n' +
    '\n' +
    '            <li><a href="../html/PG1_About.html"><p>About Us</p></a>\n' +
    '            </li>\n' +
    '            <li id="products_li">\n' +
    '                <a href="../html/PG2_Products.html"><p>Our Products</p></a>\n' +
    '                <ul class="dropdown_content">\n' +
    '                    <li><a href="../html/Pianos.html"><p>Pianos</p></a>\n' +
    '                    </li>\n' +
    '                    <li><a href="#"><p>Amplifiers</p></a>\n' +
    '                    </li>\n' +
    '                    <li><a href="#"><p>Drumkits</p></a>\n' +
    '                    </li>\n' +
    '                    <li><a href="#"><p>Brass</p></a>\n' +
    '                    </li>\n' +
    '                    <li><a href="#"><p>Guitars</p></a>\n' +
    '                    </li>\n' +
    '                    <li><a href="#"><p>GIFT SHOP!</p></a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </li>\n' +
    '            <li><a href="../html/PG3_News.html"><p>The Latest in Music</p></a>\n' +
    '            </li>\n' +
    '            <li id="shopping_cart_li"><a href="../html/PG4_Virtual_Piano.html"><img id="shopping_cart" src="../img/piano_icon.png" alt="Shopping Cart" title="Shopping Cart"/></a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <div id="search_bar_div"><a><input id="search_bar" type="text" placeholder="Search Our Store..."></a>\n' +
    '        </div>\n' +
    '    </nav>');



function myFunction() {
    let x = document.getElementsByTagName("header")[0];
    if (x.className === "") {
        x.className += "responsive";
        let children = x.getElementsByTagName("*");
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            child.className += " responsive";
        }
    }
    else {
        x.className = "";
        let children = x.getElementsByTagName("*");
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let classStr = child.className;
            let lastIndex = classStr.lastIndexOf(" ");
            child.className = classStr.substring(0, lastIndex);
        }
    }

    setOtherPagePosition();
}

function setOtherPagePosition() {
    var mainPage = document.getElementsByTagName("main")[0];
    if (mainPage !== undefined) {
        var mainPagePosition = window.getComputedStyle(document.getElementsByTagName("header")[0]).height;
        var mainPagePositionBottom = window.getComputedStyle(document.getElementsByTagName("footer")[0]).height;
        mainPage.style.marginTop = mainPagePosition;
        mainPage.style.marginBottom = mainPagePositionBottom;
    }
}