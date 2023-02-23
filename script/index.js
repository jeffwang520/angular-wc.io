let userModalRef = null;
function $e(id) {
  return document.getElementById(id);
}
//----------------------------[bootstrap] Web Component Test Script---------------------------------
window.addEventListener('load', () => {
  console.log('bootstrap angular web component tester is ready');
});
//############################[bootstrap] Web Component Test Script#################################

//----------------------------[card] Web Component Test Script---------------------------------
window.addEventListener('load', () => {
  console.log('card angular web component tester is ready');
});
//############################[card] Web Component Test Script#################################

//----------------------------[hello] Web Component Test Script---------------------------------
window.addEventListener('load', () => {
  console.log('hello angular web component tester is ready');
});
//############################[hello] Web Component Test Script#################################

//----------------------------[input] Web Component Test Script---------------------------------
window.addEventListener('load', () => {
  $e('input_set_title_button').addEventListener('click', () => {
    $e('input_wc_element').myTitle = $e('input_request_title').value;
  });

  $e('input_get_title_button').addEventListener('click', () => {
    $e('input_response_title').value = $e('input_wc_element').myTitle;
  });
  console.log('input angular web component tester is ready');
});

//############################[input] Web Component Test Script#################################

//----------------------------[popup] Web Component Test Script---------------------------------
const alert = (message, type) => {
  const alertPlaceholder = document.getElementById('_global_alert_container');
  const wrapper = document.createElement('div');
  let alertMessage = '';
  if (message) {
    alertMessage = typeof message == 'string' ? message : JSON.stringify(message);
  }
  let alertType = type ? type : 'warning';
  wrapper.innerHTML = [
    `<div class="alert alert-${alertType} alert-dismissible" role="alert">`,
    `   <div>${alertMessage}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');
  alertPlaceholder.append(wrapper);
};
window.addEventListener('load', () => {
  $e('popup_button').addEventListener('click', () => {
    const message = $e('popup_message').value;
    if (message.length > 0) {
      const container = $e('popup_element_container');
      const popupElment = document.createElement('my-custom-web-component-popup');
      popupElment.message = message;
      container.appendChild(popupElment);
      popupElment.addEventListener('closed', () => container.removeChild(popupElment));
    } else {
      $e('popup_message').focus();
    }
    console.log('popup angular web component tester is ready');
  });
  $e('popup_button_show_alert').addEventListener('click', () => {
    alert('Nice, you triggered this alert message!', 'warning');
  });
});

//############################[popup] Web Component Test Script#################################

//----------------------------[table] Web Component Test Script---------------------------------
window.addEventListener('load', () => {
  table_wc_load_1();
  table_wc_load_2();
  table_wc_load_3();
  table_wc_load_4();
  table_wc_load_5();
  console.log('table angular web component tester is ready');
});

function table_wc_load_1() {
  const table = $e('table-wc-1');
  table.tableHeader = getTableTestHeader();
  table.tableRecord = getTableTestRecords();
}
function table_wc_load_2() {
  const table = $e('table-wc-2');
  table.tableHeader = getTableTestHeader();
  table.tableRecord = getTableTestRecords();
  $e('table_2_siggle').addEventListener('click', () => {
    table.selectBox = { enable: true, multiSelect: false };
  });
  $e('table_2_multiple').addEventListener('click', () => {
    table.selectBox = { enable: true, multiSelect: true };
  });
}
function table_wc_load_3() {
  const table = $e('table-wc-3');
  table.tableHeader = getTableTestHeader();
  table.tableRecord = getTableTestRecords();
  table.sortEnable = true;
  table.addEventListener('sort', (sortEventData) => {
    const evtData = sortEventData.detail;
    table.tableRecord = [];
    table.spinner = true;
    table.tableRecord = compare(evtData.records, evtData.column, evtData.direction);
    table.spinner = false;
  });
}
function table_wc_load_4() {
  table_wc_load_default($e('table-wc-4'), false);
}
function table_wc_load_5() {
  const table = $e('table-wc-5');
  const needRecordButtons = true;
  table.selectBox = { enable: true, multiSelect: false };
  table.headerButton = buildTestTableHeaderButton();
  table_wc_load_default(table, needRecordButtons);

  table.addEventListener('headerClick', (recordAction) => {
    const clickEvent = recordAction.detail;
    console.log(clickEvent);
    const action = clickEvent.button.type;
    const tableUser = clickEvent.records.length > 0 ? clickEvent.records[0] : null;
    const user = tableUser ? findUserByRecordId(tableUser.id) : null;
    tableRecordActionCommonHandler(action, user, table);
  });
  table.addEventListener('recordAction', (recordAction) => {
    tableRecordActionHandler(table, recordAction.detail);
  });
  const userComponent = $e('table_user_component_element');
  userComponent.addEventListener('idChange', (event) => {
    const id = event.detail;
    if (id.length == 0) {
      return;
    }
    userComponent.spinner = true;
    const callback = function (userCallback) {
      userComponent.spinner = false;
      if (userCallback.success) {
        if (userCallback.records && userCallback.records.length > 0) {
          userComponent.message = 'this user id already exist!';
          userComponent.userId = '';
        }
      } else {
        userComponent.message = userCallback.message ? userCallback.message : '';
      }
    };
    getUserById(id, callback);
  });
  userComponent.addEventListener('confirm', (action) => {
    const actionData = action.detail;
    createUpdateConfirm(userComponent, actionData.action, actionData.user, table, needRecordButtons);
  });

  userComponent.addEventListener('close', () => {
    closeUserModal();
  });
}

function createUpdateConfirm(userComponent, action, user, table, needRecordButtons) {
  userComponent.spinner = true;
  const callback = function (response) {
    if (response.success) {
      closeUserModal();
      userComponent.spinner = false;
      const pageConfg = getDefaultPageConfig();
      pageConfg.pageNumber = 1;
      pageConfg.pageSize = table.pagination.pageSize;
      queryUserRecordsByPage(table, pageConfg, needRecordButtons);
    } else {
      alert(JSON.stringify(response));
    }
  };
  switch (action) {
    case 'A':
      createUser(buildCreateRequestUser(user), callback);
      break;
    case 'E':
      updateUser(user, callback);
      break;
  }
}

function tableRecordActionHandler(table, action) {
  const name = action.button.name;
  const user = findUserByRecordId(action.record.id);
  let actionName = '';
  switch (name) {
    case 'view':
      actionName = 'V';
      break;
    case 'edit':
      actionName = 'E';
      break;
    case 'delete':
      actionName = 'D';
      break;
    default:
      actionName = '';
  }
  if (actionName == '') {
    alert('no permission!');
    return;
  }
  tableRecordActionCommonHandler(actionName, user, table);
}
function tableRecordActionCommonHandler(action, user, table) {
  switch (action) {
    case 'A':
      openUserModal();
      setUserActionData({ action: action, user: null });
      break;
    case 'V':
    case 'E':
      if (user) {
        openUserModal();
        setUserActionData({ action: action, user: user });
      }
      break;
    case 'D':
      const deleteCallback = function (userCallback) {
        if (userCallback.success) {
          queryUserRecordsByPage(table, null, true);
        } else {
          alert(JSON.stringify(userCallback));
        }
        table.spinner = false;
      };
      table.spinner = true;
      deleteUser(user, deleteCallback);
      break;
    default:
      alert('no permission!');
  }
}

function openUserModal() {
  userModalRef = new bootstrap.Modal('#table_user_modal', { backdrop: 'static' });
  userModalRef.show();
}
function closeUserModal() {
  if (userModalRef) {
    userModalRef.hide();
  }
}
function setUserActionData(action) {
  const userComponent = $e('table_user_component_element');
  userComponent.action = action;
}

function table_wc_load_default(table, needRecordButtons) {
  table.tableHeader = getTableTestHeader(needRecordButtons);
  table.sortEnable = true;
  queryUserRecordsByPage(table, null, needRecordButtons);
  addTablePageChangeListener(table, needRecordButtons);
  addTableSortChangeListener(table, needRecordButtons);
}
function queryUserRecordsByPageWithQH(table, pageRequest, needRecordButtons, q, h) {
  const qStr = q ? q : '{}';
  const hStr = h ? h : '{}';
  table.spinner = true;
  const pageConfig = pageRequest ? pageRequest : getDefaultPageConfig();
  const settings = {
    url: buildQueryUrl(qStr, pageConfig.pageSize, getSkipSize(pageConfig), hStr),
    method: 'GET',
    headers: getRestDbApiHeader(),
  };

  $.ajax(settings).done(function (response) {
    table.spinner = false;
    table.tableRecord = [];
    table.tableRecord = buildRestDbUsers(response, needRecordButtons);
    table.pagination = buildPageConfig(pageConfig, response.totals.total);
  });
}
function queryUserRecordsByPage(table, pageRequest, needRecordButtons) {
  queryUserRecordsByPageWithQH(table, pageRequest, needRecordButtons, null, null);
}

function addTablePageChangeListener(table, needRecordButtons) {
  table.addEventListener('pageChange', (pageChangeEvent) => {
    const eventData = pageChangeEvent.detail;
    const pageConfig = getDefaultPageConfig();
    pageConfig.pageNumber = eventData.pageNumber;
    pageConfig.pageSize = eventData.pageSize;
    queryUserRecordsByPage(table, pageConfig, needRecordButtons);
  });
}
function addTableSortChangeListener(table, needRecordButtons) {
  table.addEventListener('sort', (sortEvent) => {
    const eventData = sortEvent.detail;
    const pageRequest = getDefaultPageConfig();
    let hStr = '{}';
    if (eventData.direction != '') {
      const orderDirection = eventData.direction == 'asc' ? 1 : -1;
      const orderColumn = eventData.column;
      hStr = `{"$orderby": {"${orderColumn}": ${orderDirection}}}`;
    }
    queryUserRecordsByPageWithQH(table, pageRequest, needRecordButtons, null, hStr);
  });
}
function createUser(user, callback) {
  try {
    const settings = {
      url: DB_SERVER,
      method: 'POST',
      headers: getRestDbApiHeader(),
      data: user,
    };
    console.log('createUser-----------------');
    console.log(settings);
    console.log('createUser=================');
    $.ajax(settings)
      .done(function (response) {
        callback({ success: true });
      })
      .fail(function (response) {
        callback({ success: false, message: response });
      });
  } catch (error) {
    callback({ success: false, message: error.message, data: error });
  }
}
//############################[table] Web Component Test Script#################################
function updateUser(user, callback) {
  try {
    const orgUser = findUserByUserId(user.id);
    const restDbUser = buildUpdateRequestUser(user, orgUser);
    if (Object.keys(restDbUser).length == 0) {
      callback({ success: false, message: 'user data no change!' });
    } else {
      const settings = {
        url: DB_SERVER + '/' + orgUser['_id'],
        method: 'PUT',
        headers: getRestDbApiHeader(),
        data: restDbUser,
      };
      console.log('updateUser-----------------');
      console.log(settings);
      console.log('updateUser=================');

      $.ajax(settings)
        .done(function (response) {
          callback({ success: true });
        })
        .fail(function (response) {
          callback({ success: false, message: response });
        });
    }
  } catch (error) {
    callback({ success: false, message: error.message, data: error });
  }
}
function deleteUser(user, callback) {
  const settings = {
    url: DB_SERVER + '/' + user['_id'],
    method: 'DELETE',
    headers: getRestDbApiHeader(),
  };

  $.ajax(settings)
    .done(function (response) {
      callback({ success: true });
    })
    .fail(function (response) {
      callback({ success: false, message: response });
    });
}
function getUserById(id, callback) {
  const settings = {
    url: DB_SERVER + '?q={"id":"' + id + '"}',
    method: 'GET',
    headers: getRestDbApiHeader(),
  };

  $.ajax(settings)
    .done(function (response) {
      let records = [];
      if (response && response.length > 0) {
        records = buildRestDbUsers(response);
      }
      callback({ success: true, records: records });
    })
    .fail(function (response) {
      callback({ success: false, message: response });
    });
}
