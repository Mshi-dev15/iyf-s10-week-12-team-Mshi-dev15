const Avatar = ({ src, alt = "avatar" }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "40px", height: "40px", borderRadius: "50%" }}
    />
  );
};

export default Avatar;