(function () {
  var live = document.getElementById("a11y-status");
  if (!live) {
    live = document.createElement("div");
    live.id = "a11y-status";
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    document.body.appendChild(live);
  }

  function announce(message) {
    live.textContent = "";
    window.setTimeout(function () {
      live.textContent = message;
    }, 50);
  }

  document.querySelectorAll(".code-block").forEach(function (block) {
    var source = block.querySelector(".code-source");
    var gutter = block.querySelector(".code-gutter");
    if (!source || !gutter) {
      return;
    }
    var text = source.innerText.replace(/\n$/, "");
    var count = text ? text.split("\n").length : 0;
    var lines = [];
    for (var i = 1; i <= count; i += 1) {
      lines.push(String(i));
    }
    gutter.textContent = lines.join("\n");
  });

  document.querySelectorAll(".copy-code").forEach(function (button) {
    button.addEventListener("click", function () {
      var block = button.closest(".code-block");
      var source = block && block.querySelector(".code-source");
      if (!source) {
        return;
      }

      var text = source.innerText.replace(/\n$/, "");
      var done = function () {
        var original = button.getAttribute("data-label") || button.textContent;
        button.setAttribute("data-label", original);
        button.textContent = "Código copiado";
        announce("Código copiado com sucesso");
        window.setTimeout(function () {
          button.textContent = original;
          live.textContent = "";
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          announce("Não foi possível copiar o código");
        });
        return;
      }

      announce("Não foi possível copiar o código");
    });
  });
})();
