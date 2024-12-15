const Overview = () => {
  return (
    <div className="flex divide-x">
      <div className="py-4 px-6 space-y-6 text-center w-full">
        <h3>総学習時間</h3>
        <div className="space-x-1">
          <span className="text-3xl">32</span>
          <span className="text-xl">時間</span>
          <span className="text-3xl">24</span>
          <span className="text-xl">分</span>
        </div>
      </div>
      <div className="py-4 px-6 space-y-6 text-center w-full">
        <h3>総挑戦金額</h3>
        <div className="space-x-1">
          <span className="text-3xl">3200</span>
          <span className="text-xl">円</span>
        </div>
      </div>
      <div className="py-4 px-6 space-y-6 text-center w-full">
        <h3>総失敗金額</h3>
        <div className="space-x-1">
          <span className="text-3xl">1000</span>
          <span className="text-xl">円</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
