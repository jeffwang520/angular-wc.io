function getTableTestHeader(actionButton) {
  const header = [
    {
      name: 'id',
      desc: 'id',
    },
    {
      name: 'name',
      desc: 'name',
    },
    {
      name: 'role',
      desc: 'role',
    },
    {
      name: 'age',
      desc: 'age',
    },
    {
      name: 'hireDate',
      desc: 'hire Date',
    },
    {
      name: 'salary',
      desc: 'Salary',
    },
  ];
  if (actionButton) {
    header.push({
      name: 'action',
      desc: 'action',
    });
  }
  return header;
}
function getTableTestRecords() {
  return [
    {
      id: 'T0001',
      columns: [
        {
          type: 'string',
          name: 'id',
          value: 'T0001',
        },
        {
          type: 'string',
          name: 'name',
          value: 'Albert Wang',
        },
        {
          type: 'string',
          name: 'role',
          value: 'SD',
        },
        {
          type: 'number',
          name: 'age',
          value: 20,
        },
        {
          type: 'date',
          name: 'hireDate',
          value: '2020-02-16',
        },
        {
          type: 'number',
          name: 'salary',
          value: '1111.11',
        },
      ],
    },
    {
      id: 'T0002',
      columns: [
        {
          type: 'string',
          name: 'id',
          value: 'T0002',
        },
        {
          type: 'string',
          name: 'name',
          value: 'Berton Wang',
        },
        {
          type: 'string',
          name: 'role',
          value: 'SE',
        },
        {
          type: 'number',
          name: 'age',
          value: 21,
        },
        {
          type: 'date',
          name: 'hireDate',
          value: '2010-02-16',
        },
        {
          type: 'number',
          name: 'salary',
          value: '2222.11',
        },
      ],
    },
    {
      id: 'T0003',
      columns: [
        {
          type: 'string',
          name: 'id',
          value: 'T0003',
        },
        {
          type: 'string',
          name: 'name',
          value: 'Dwight Wang',
        },
        {
          type: 'string',
          name: 'role',
          value: 'BA',
        },
        {
          type: 'number',
          name: 'age',
          value: 21,
        },
        {
          type: 'date',
          name: 'hireDate',
          value: '2021-02-16',
        },
        {
          type: 'number',
          name: 'salary',
          value: '3333.11',
        },
      ],
    },
    {
      id: 'T0004',
      columns: [
        {
          type: 'string',
          name: 'id',
          value: 'T0004',
        },
        {
          type: 'string',
          name: 'name',
          value: 'Harold Wang',
        },
        {
          type: 'string',
          name: 'role',
          value: 'BA',
        },
        {
          type: 'number',
          name: 'age',
          value: 25,
        },
        {
          type: 'date',
          name: 'hireDate',
          value: '2001-02-16',
        },
        {
          type: 'number',
          name: 'salary',
          value: '4444.11',
        },
      ],
    },
    {
      id: 'T0005',
      columns: [
        {
          type: 'string',
          name: 'id',
          value: 'T0005',
        },
        {
          type: 'string',
          name: 'name',
          value: 'Marlon Wang',
        },
        {
          type: 'string',
          name: 'role',
          value: 'BA',
        },
        {
          type: 'number',
          name: 'age',
          value: 25,
        },
        {
          type: 'date',
          name: 'hireDate',
          value: '2003-02-16',
        },
        {
          type: 'number',
          name: 'salary',
          value: '5555.55',
        },
      ],
    },
  ];
}
function buildTestTableHeaderButton() {
  const addButton = {
    id: 'addButton',
    type: 'A',
    value: 'Add',
    title: 'Add Button Title',
    class: 'btn-info',
  };
  const viewButton = {
    id: 'viewButton',
    type: 'V',
    value: 'View',
    title: 'View Button Title',
    class: 'btn-success',
  };
  const editButton = {
    id: 'editButton',
    type: 'E',
    value: 'Edit',
    title: 'Edit Button Title',
    class: 'btn-warning',
  };
  const deleteButton = {
    id: 'deleteButton',
    type: 'D',
    value: 'Delete',
    title: 'Delete Button Title',
    class: 'btn-danger',
  };
  return [addButton, viewButton, editButton, deleteButton];
}
