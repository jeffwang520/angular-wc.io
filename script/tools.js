const DB_SERVER = 'https://jeffwang-6280.restdb.io/rest/angular-user';
function compareStringNumber(v1, v2) {
  const v = v1 > v2 ? 1 : 0;
  return v1 < v2 ? -1 : v;
}
function compare(records, column, direction) {
  return [...records].sort((a, b) => {
    const a1 = getCloumnValue(a.columns, column);
    const b1 = getCloumnValue(b.columns, column);
    const res = compareStringNumber(a1, b1);
    return direction === 'asc' ? res : -res;
  });
}
function getCloumnValue(columns, name) {
  if (columns) {
    for (let column of columns) {
      if (column.name === name) return column.value;
    }
  }
  return 0;
}
function getRestDbApiHeader() {
  return {
    'x-apikey': '63e79398478852088da68076',
  };
}
function buildQueryUrl(qstr, pageSize, skipSize, hstr) {
  let url = DB_SERVER;
  url += '?q=' + qstr;
  url += '&totals=true';
  url += '&max=' + pageSize;
  url += '&skip=' + skipSize;
  url += '&h=' + hstr;
  return url;
}

function getSkipSize(page) {
  const skip = (page.pageNumber - 1) * page.pageSize;
  return skip < 0 ? 0 : skip;
}
function getDefaultPageConfig() {
  return {
    enable: true,
    itemsPerPage: [10, 15, 20],
    pageNumber: 1,
    pageSize: 10,
    totalRecord: 0,
  };
}
let responseUsers = [];
function buildRestDbUsers(restDbUsers, recordButtons) {
  const users = [];
  responseUsers = restDbUsers.data ? restDbUsers.data : restDbUsers;
  responseUsers.forEach((user) => {
    users.push({
      id: user._id,
      columns: buildUserRecordColumns(user, recordButtons),
    });
  });
  return users;
}

function findUserByRecordId(recordId) {
  return findUserByRecordColumn('_id', recordId);
}
function findUserByUserId(userId) {
  return findUserByRecordColumn('id', userId);
}
function findUserByRecordColumn(columnName, value) {
  if (responseUsers) {
    for (const respUser of responseUsers) {
      if (respUser[columnName] == value) {
        return Object.assign({}, respUser);
      }
    }
  }
  return undefined;
}
function removeUserFromCache(user2) {
  responseUsers = responseUsers.filter(function (user1) {
    return user1['_id'] !== user2['_id'];
  });
}

function buildUserRecordColumns(user, recordButtons) {
  const columns = [
    {
      type: 'string',
      name: 'id',
      value: user.id,
      title: 'User Id',
    },
    {
      type: 'string',
      name: 'name',
      value: user.name,
      title: 'User Name',
    },
    {
      type: 'string',
      name: 'role',
      value: user.role,
      title: 'Title',
    },
    {
      type: 'int',
      name: 'age',
      value: user.age,
      title: 'Age',
    },
    {
      type: 'date',
      name: 'hireDate',
      value: user.hireDate,
      title: 'Hire Date',
    },
    {
      type: 'number',
      name: 'salary',
      value: user.salary,
      title: 'Hire Date',
    },
  ];
  if (recordButtons) {
    columns.push({
      type: 'group',
      name: 'buutons',
      child: [
        { type: 'button', name: 'view', value: 'view', title: 'view' },
        { type: 'button', name: 'edit', value: 'edit', title: 'edit' },
        { type: 'button', name: 'delete', value: 'delete', title: 'delete' },
        { type: 'button', name: 'release', value: 'release', title: 'release' },
      ],
    });
  }
  return columns;
}
function buildPageConfig(pageConfig, totalRecord) {
  let newPageConfig = getDefaultPageConfig();
  newPageConfig.totalRecord = totalRecord ? totalRecord : 0;
  newPageConfig.pageNumber = pageConfig.pageNumber;
  newPageConfig.pageSize = pageConfig.pageSize;
  newPageConfig.enable = true;
  return newPageConfig;
}
function buildUpdateRequestUser(user, orgUser) {
  const retUser = {};
  if (user.address != orgUser['address']) {
    retUser.address = user.address;
  }
  if (user.role != orgUser['role']) {
    retUser.role = user.role;
  }
  if (user.age != orgUser['age']) {
    retUser.age = user.age;
  }
  if (user.hireDate != orgUser['hireDate']) {
    retUser.hireDate = user.hireDate;
  }
  if (user.salary != orgUser['salary']) {
    retUser.salary = user.salary;
  }
  return retUser;
}
function buildCreateRequestUser(user) {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    address: user.address,
    age: user.age,
    hireDate: user.hireDate,
    salary: user.salary,
  };
}
