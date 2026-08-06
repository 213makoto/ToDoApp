function UserSelector({
  users,
  selectedUserId,
  setSelectedUserId,
}) {
  return (
    <select
      value={selectedUserId}
      onChange={(e) =>
        setSelectedUserId(Number(e.target.value))
      }
    >
      {users.map((user) => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelector;