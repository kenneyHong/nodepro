const goodsData = {
  BillNumber: 'TH2001131428010013',
  Supplier: '零成本公司',
  SourceType: '自建',
  CreateTime: '2020-01-01 13:20:00',
  PurchaseUser: '张三',
  PurchaseNumber: 100,
  PurchaseCost: 10000,
  CheckTime: '2020-01-13 14:00:50',
  State: 5,
}
const accountList = {
  name: 'name',
  CapitalCode: '1929818000154030',  // 资金账号
  AccountName: '忆想投资股份有限公司', // 户名
  BankEcode: '99112111374200201910024671', // 银行电子账号
  CharacterType: 2101, // 商户类型
  CompanyCode: 'thinker', // 公司编码
  CompanyName: 'thinker', //公司名称
  StoreCode: '', // 门店编码
  StoreName: '', // 门店名称
  // 账户余额
  SubSumed: 600, // 总金额
  BaseSumed: 500, // 基本账户
  OpSumed: 100, // 运营账户
  // 可用金额
  SubValid: 800, // 总金额
  BaseValid: 400, // 基本账户
  OpValid: 400, // 运营账户
  // 锁定金额
  SubLock: 1000, // 总金额
  BaseLock: 600, // 基本账户
  OpLock: 400, // 运营账户
  State: '1', // 账户状态
}
const accountDeteil = {
  CapitalCode: '1929818000154030',  // 资金账号
  EwalletType: 3, // 账户类型
  AccountName: '忆想投资股份有限公司', // 户名
  BankEcode: '99112111374200201910024671', // 银行电子账号
  LastOpenTime: '2019-10-25 17:54', // 开户时间
  Mobile: '13512341234', // 手机号码
  LegalName: '李四', // 法定代表人姓名
  PersonIdcard: '110101199003070898', // 身份证号码
  ProvinceId: 440000,
  ProvinceName: '广东省', // 省
  CityId: 440300,
  CityName: '深圳市', // 市
  TownId: 440303,
  TownName: '罗湖区',  // 区
  Address: '特力珠宝大厦13楼-测试', // 详细地址
  CreditCode: '91440300MA5DEPQH74', // 社会统一码
  SubbkCode: '304100042626',  // 归属支行号
  SubbkName: '华夏银行北京分行营业部',  // 归属支行名称
  Logs: '[{"userId":1,"userName":"莫今维","characterType":3001,"operation":"审核通过","operationType":1,"note":"","logTime":"2020-01-03 16:55:21"},{"userId":1,"userName":"莫今维","characterType":3001,"operation":"开户失败(报文格式错误[身份证号码格式不正确])","operationType":1,"note":"","logTime":"2020-01-03 16:55:21"},{"userId":1,"userName":"莫今维","characterType":3001,"operation":"重新开户审核通过","operationType":1,"note":"","logTime":"2020-01-03 16:56:05"},{"userId":1,"userName":"莫今维","characterType":3001,"operation":"开户失败(报文格式错误[身份证号码格式不正确])","operationType":1,"note":"","logTime":"2020-01-03 16:56:05"},{"userId":1,"userName":"莫今维","characterType":3001,"operation":"重新开户审核通过","operationType":1,"note":"","logTime":"2020-01-03 16:56:43"}]'  // 操作日志
}
const walletList = {
  name: 'name',
  AccountName: '忆想投资股份有限公司', // 户名
  Idcard: '4405821994xxxxxxxx',
  Mobile: '13415123219',
  Email: '111@qq.com',
  PayPassword: '123123123'
}

module.exports = {
  goodsData,
  accountList,
  accountDeteil,
  walletList
}