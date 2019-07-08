import React from 'react';
import gravatarUrl from 'gravatar-url';

function Gravatar() {
  return (
    <div>
      <img
        src={gravatarUrl(this.props.email)}
        alt="avatar"
      />
    </div>
  );
}

export default Gravatar;

