const CustomHr = ({ spacing = "my-3" }) => {
  return (
    <hr
      className={`${spacing} h-[1px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent w-full`}
    />
  );
};

export default CustomHr;
