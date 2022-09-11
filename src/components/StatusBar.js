const StatusBar = props => {
  return (
    <div
      className={`${
        props.status === 'approved'
          ? 'approved-status'
          : props.status === 'pending'
          ? 'pending-status'
          : props.status === 'rejected'
          ? 'rejected-status'
          : ''
      }`}
    >
      {props.status}
    </div>
  );
};

export default StatusBar;
