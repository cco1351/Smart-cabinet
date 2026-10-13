function renderRoleSwitch() {
      const roleSwitch = document.getElementById("roleSwitch");
      roleSwitch.innerHTML = "";
      Object.entries(roleConfigs).forEach(([roleKey, config]) => {
        const btn = el("button", "mode-btn" + (roleKey === currentRole ? " active" : ""), config.label);
        btn.type = "button";
        btn.addEventListener("click", () => {
          currentRole = roleKey;
          uiState.history = [];
          renderRolePrototypePage(roleConfigs[currentRole].homeId, { pushHistory: false });
        });
        roleSwitch.appendChild(btn);
      });
    }

    function renderPageTabs(selectedId) {
      const tabs = document.getElementById("pageTabs");
      tabs.innerHTML = "";
      rolePages().forEach(page => {
        const btn = el("button", "page-tab" + (page.id === selectedId ? " active" : ""), page.title);
        btn.type = "button";
        btn.addEventListener("click", () => openPage(page.id));
        tabs.appendChild(btn);
      });
    }

    function renderRolePrototypePage(pageId, options = {}) {
      const safePageId = roleCanOpen(pageId) && !roleDeniedAction(pageId) ? pageId : roleConfigs[currentRole].homeId;
      const page = rolePageById(safePageId);
      const appFrame = document.getElementById("appFrame");
      uiState.currentPageId = page.id;

      renderRoleSwitch();
      renderPageTabs(page.id);
      document.getElementById("roleSummary").textContent = roleConfigs[currentRole].summary;

      appFrame.innerHTML = "";
      appFrame.appendChild(renderPage(page));

      const url = new URL(location.href);
      url.searchParams.set("role", currentRole);
      url.searchParams.set("page", page.id);
      history.replaceState({}, "", url);
    }

    openPage = function(pageId, options = {}) {
      if (!pageId) return;
      const deniedMessage = roleDeniedAction(pageId);
      if (deniedMessage) {
        showPermissionDenied(document.querySelector("#appFrame .phone"), deniedMessage);
        return;
      }
      const safePageId = roleCanOpen(pageId) ? pageId : roleConfigs[currentRole].homeId;
      const target = rolePageById(safePageId);
      if (!target) return;
      if (options.pushHistory !== false && uiState.currentPageId && uiState.currentPageId !== target.id) {
        uiState.history.push(uiState.currentPageId);
      }
      renderRolePrototypePage(target.id, options);
    };

    goBack = function() {
      const previous = uiState.history.pop();
      if (previous) {
        renderRolePrototypePage(previous, { pushHistory: false });
        return;
      }
      renderRolePrototypePage(roleConfigs[currentRole].homeId, { pushHistory: false });
    };

    function bootRolePrototype() {
      const params = new URLSearchParams(location.search);
      const role = params.get("role");
      if (roleConfigs[role]) currentRole = role;
      const selectedId = params.get("page") || roleConfigs[currentRole].homeId;
      const capture = params.get("capture");

      if (capture) {
        const page = rolePageById(selectedId);
        renderCapture(page.id);
        window.__wireframePages = rolePages().map(p => ({ id: p.id, title: p.title }));
        return;
      }

      renderRolePrototypePage(selectedId, { pushHistory: false });
      window.__wireframePages = rolePages().map(p => ({ id: p.id, title: p.title }));
    }
    bootRolePrototype();
