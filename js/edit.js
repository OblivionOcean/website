// md输入和渲染
mermaid.initialize({startOnLoad: true});
const lute = Lute.New();
const html2MdRenderer = {
    renderLinkDest: function (node, entering) {
        if (entering) {
            console.log('重写 LinkDest 节点', node.__internal_object__.typ, node.TokensStr(), entering);
            return [node.TokensStr(), Lute.WalkContinue]
        } else {
            return ["", Lute.WalkContinue]
        }
    }, renderBang: function (node, entering) {
        if (entering) {
            console.log('重写 Bang 节点', node.TokensStr(), entering);
            return ["!", Lute.WalkContinue]
        } else {
            return ["", Lute.WalkContinue]
        }
    },
};
lute.SetJSRenderers({
    "renderers": {
        "HTML2Md": html2MdRenderer,
    }
});
var isIE = !(!document.all);

function onMarkdown(it) {
    const result = lute.MarkdownStr("", it.value);
    document.getElementById('md-output').innerHTML = result;
    hljs.highlightAll();
    for (var i = 0; i < document.getElementsByClassName("language-mermai").length; i++) {
        document.getElementsByClassName("language-mermai")[i].classList.add('mermai');
    }
    mermaid.initialize({startOnLoad: true});
    console.log(result, lute.HTML2Md(result), lute.RenderJSON(it.value))
}

//获取光标
function posCursor() {
    var start = 0, end = 0;
    var oTextarea = document.getElementsByClassName("md-input")[0];
    if (isIE) {
        //selection 当前激活选中区，即高亮文本块，和/或文当中用户可执行某些操作的其它元素。
        //createRange 从当前文本选中区中创建 TextRange 对象，
        //或从控件选中区中创建 controlRange 集合。
        var sTextRange = document.selection.createRange();

        //判断选中的是不是textarea对象
        if (sTextRange.parentElement() == oTextarea) {
            //创建一个TextRange对象
            var oTextRange = document.body.createTextRange();
            //移动文本范围以便范围的开始和结束位置能够完全包含给定元素的文本。
            oTextRange.moveToElementText(oTextarea);

            //此时得到两个 TextRange
            //oTextRange文本域(textarea)中文本的TextRange对象
            //sTextRange是选中区域文本的TextRange对象

            //compareEndPoints方法介绍，compareEndPoints方法用于比较两个TextRange对象的位置
            //StartToEnd  比较TextRange开头与参数TextRange的末尾。
            //StartToStart比较TextRange开头与参数TextRange的开头。
            //EndToStart  比较TextRange末尾与参数TextRange的开头。
            //EndToEnd    比较TextRange末尾与参数TextRange的末尾。

            //moveStart方法介绍，更改范围的开始位置
            //character 按字符移动
            //word       按单词移动
            //sentence  按句子移动
            //textedit  启动编辑动作

            //这里我们比较oTextRange和sTextRange的开头，的到选中区域的开头位置
            for (start = 0; oTextRange.compareEndPoints("StartToStart", sTextRange) < 0; start++) {
                oTextRange.moveStart('character', 1);
            }
            //需要计算一下\n的数目(按字符移动的方式不计\n,所以这里加上)
            for (var i = 0; i <= start; i++) {
                if (oTextarea.value.charAt(i) == '\n') {
                    start++;
                }
            }

            //再计算一次结束的位置
            oTextRange.moveToElementText(oTextarea);
            for (end = 0; oTextRange.compareEndPoints('StartToEnd', sTextRange) < 0; end++) {
                oTextRange.moveStart('character', 1);
            }
            for (var i = 0; i <= end; i++) {
                if (oTextarea.value.charAt(i) == '\n') {
                    end++;
                }
            }
        }
    } else {
        start = oTextarea.selectionStart;
        end = oTextarea.selectionEnd;
    }
    return {start: start, end: end};
}

//移动光标
function moveCursor(start, end) {
    var oTextarea = document.getElementsByClassName("md-input")[0];
    if (isNaN(start) || isNaN(end)) {
        alert("位置输入错误");
    }
    if (isIE) {
        var oTextRange = oTextarea.createTextRange();
        var LStart = start;
        var LEnd = end;
        var start = 0;
        var end = 0;
        var value = oTextarea.value;
        for (var i = 0; i < value.length && i < LStart; i++) {
            var c = value.charAt(i);
            if (c != '\n') {
                start++;
            }
        }
        for (var i = value.length - 1; i >= LEnd && i >= 0; i--) {
            var c = value.charAt(i);
            if (c != '\n') {
                end++;
            }
        }
        oTextRange.moveStart('character', start);
        oTextRange.moveEnd('character', -end);
        //oTextRange.collapse(true);
        oTextRange.select();
        oTextarea.focus();
    } else {
        oTextarea.select();
        oTextarea.selectionStart = start;
        oTextarea.selectionEnd = end;
    }
}

const pickerOptions = {
    onEmojiSelect: function (n) {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + n.shortcodes + HTML.substring(posCursor().end);
        document.getElementsByClassName("emojis-icon")[0].onclick()
        onMarkdown(document.getElementsByClassName("md-input")[0])
    }, i18n: {
        "search": "搜索",
        "search_no_results_1": "哦不！",
        "search_no_results_2": "没有找到相关表情",
        "pick": "选择一个表情…",
        "add_custom": "添加自定义表情",
        "categories": {
            "activity": "活动",
            "custom": "自定义",
            "flags": "旗帜",
            "foods": "食物与饮品",
            "frequent": "最近使用",
            "nature": "动物与自然",
            "objects": "物品",
            "people": "表情与角色",
            "places": "旅行与景点",
            "search": "搜索结果",
            "symbols": "符号"
        },
        "skins": {
            "choose": "选择默认肤色", "1": "默认", "2": "白色", "3": "偏白", "4": "中等", "5": "偏黑", "6": "黑色"
        }
    }
}
const picker = new EmojiMart.Picker(pickerOptions)
document.getElementById('main').append(picker)

function edit_nav() {
//顶栏
    document.getElementsByTagName('em-emoji-picker')[0].style.display = "none";
    document.getElementsByClassName("md-h")[0].style.display = "none";
    document.getElementsByClassName("emojis-icon")[0].onclick = function () {
        if (document.getElementsByTagName('em-emoji-picker')[0].style.display === "none") {
            document.getElementsByTagName('em-emoji-picker')[0].style.display = "flex";
        } else {
            document.getElementsByTagName('em-emoji-picker')[0].style.display = "none";
        }
    } //表情菜单
    document.getElementsByClassName("fout-size")[0].onclick = function () {
        if (document.getElementsByClassName("md-h")[0].style.display === "none") {
            document.getElementsByClassName("md-h")[0].style.display = "flex";
        } else {
            document.getElementsByClassName("md-h")[0].style.display = "none";
        }
    } //字体菜单
    document.getElementsByClassName("button-h1")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '\n# ' + HTML.substring(posCursor().end);
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //h1
    document.getElementsByClassName("button-h2")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '\n## ' + HTML.substring(posCursor().end);
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //h2
    document.getElementsByClassName("button-h3")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '\n### ' + HTML.substring(posCursor().end);
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //h3
    document.getElementsByClassName("button-h4")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '\n#### ' + HTML.substring(posCursor().end);
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //h4
    document.getElementsByClassName("button-h5")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '\n##### ' + HTML.substring(posCursor().end);
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //h5
    document.getElementsByClassName("button-h6")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '\n###### ' + HTML.substring(posCursor().end);
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //h6
    document.getElementsByClassName("bold")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '****' + HTML.substring(posCursor().end);
            moveCursor(posCursor().start - 2, posCursor().start - 2)
        } else {
            if (HTML.substring(posCursor().start, posCursor().start + 2) === '**' && HTML.substring(posCursor().end, posCursor().end - 2) === '**') {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + HTML.substring(posCursor().start + 2, posCursor().end - 2) + HTML.substring(posCursor().end);
            } else {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '**' + HTML.substring(posCursor().start, posCursor().end) + '**' + HTML.substring(posCursor().end);
            }
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //加粗
    document.getElementsByClassName("italic")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '**' + HTML.substring(posCursor().end);
            moveCursor(posCursor().start - 1, posCursor().start - 1)
        } else {
            if (HTML[posCursor().start + 1] === '*' && HTML[posCursor().end - 1] === '*') {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + HTML.substring(posCursor().start + 1, posCursor().end - 1) + HTML.substring(posCursor().end);
            } else {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '*' + HTML.substring(posCursor().start, posCursor().end) + '*' + HTML.substring(posCursor().end);
            }
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //斜体
    document.getElementsByClassName("del")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '~~~~' + HTML.substring(posCursor().end);
            moveCursor(posCursor().start - 2, posCursor().start - 2)
        } else {
            if (HTML.substring(posCursor().start, posCursor().start + 2) === '~~' && HTML.substring(posCursor().end, posCursor().end - 2) === '~~') {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + HTML.substring(posCursor().start + 2, posCursor().end - 2) + HTML.substring(posCursor().end);
            } else {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '~~' + HTML.substring(posCursor().start, posCursor().end) + '~~' + HTML.substring(posCursor().end);
            }
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    } //删除线
    document.getElementsByClassName("url")[0].onclick = function () {
        let HTML = document.getElementsByClassName("md-input")[0].value;
        if (posCursor().start === posCursor().end) {
            document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '[]()' + HTML.substring(posCursor().end);
            moveCursor(posCursor().start - 3, posCursor().start - 3)
        } else {
            if (HTML.substring(posCursor().start, posCursor().end).indexOf('http') >= -1) {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '[](' + HTML.substring(posCursor().start, posCursor().end) + ')' + HTML.substring(posCursor().end);
            } else {
                document.getElementsByClassName("md-input")[0].value = HTML.substring(0, posCursor().start) + '[' + HTML.substring(posCursor().start, posCursor().end) + ']()' + HTML.substring(posCursor().end);
            }
        }
        onMarkdown(document.getElementsByClassName("md-input")[0])
    }; //网址
}

