
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model InvoiceItem
 * 
 */
export type InvoiceItem = $Result.DefaultSelection<Prisma.$InvoiceItemPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model InvoiceFile
 * 
 */
export type InvoiceFile = $Result.DefaultSelection<Prisma.$InvoiceFilePayload>
/**
 * Model RecurringTransaction
 * 
 */
export type RecurringTransaction = $Result.DefaultSelection<Prisma.$RecurringTransactionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model SalaryPayment
 * 
 */
export type SalaryPayment = $Result.DefaultSelection<Prisma.$SalaryPaymentPayload>
/**
 * Model LeaveRequest
 * 
 */
export type LeaveRequest = $Result.DefaultSelection<Prisma.$LeaveRequestPayload>
/**
 * Model EmployeeDocument
 * 
 */
export type EmployeeDocument = $Result.DefaultSelection<Prisma.$EmployeeDocumentPayload>
/**
 * Model EmployeeLeaveBalance
 * 
 */
export type EmployeeLeaveBalance = $Result.DefaultSelection<Prisma.$EmployeeLeaveBalancePayload>
/**
 * Model BonusType
 * 
 */
export type BonusType = $Result.DefaultSelection<Prisma.$BonusTypePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EmployeeStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  TERMINATED: 'TERMINATED'
};

export type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus]


export const SalaryPaymentType: {
  SALARY: 'SALARY',
  BONUS: 'BONUS',
  ALLOWANCE: 'ALLOWANCE',
  ADVANCE: 'ADVANCE',
  OTHER: 'OTHER'
};

export type SalaryPaymentType = (typeof SalaryPaymentType)[keyof typeof SalaryPaymentType]


export const PaymentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const LeaveType: {
  ANNUAL: 'ANNUAL',
  SICK: 'SICK',
  MATERNITY: 'MATERNITY',
  PATERNITY: 'PATERNITY',
  BEREAVEMENT: 'BEREAVEMENT',
  UNPAID: 'UNPAID',
  OTHER: 'OTHER'
};

export type LeaveType = (typeof LeaveType)[keyof typeof LeaveType]


export const LeaveStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

export type LeaveStatus = (typeof LeaveStatus)[keyof typeof LeaveStatus]

}

export type EmployeeStatus = $Enums.EmployeeStatus

export const EmployeeStatus: typeof $Enums.EmployeeStatus

export type SalaryPaymentType = $Enums.SalaryPaymentType

export const SalaryPaymentType: typeof $Enums.SalaryPaymentType

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type LeaveType = $Enums.LeaveType

export const LeaveType: typeof $Enums.LeaveType

export type LeaveStatus = $Enums.LeaveStatus

export const LeaveStatus: typeof $Enums.LeaveStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Invoices
 * const invoices = await prisma.invoice.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Invoices
   * const invoices = await prisma.invoice.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoiceItem`: Exposes CRUD operations for the **InvoiceItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoiceItems
    * const invoiceItems = await prisma.invoiceItem.findMany()
    * ```
    */
  get invoiceItem(): Prisma.InvoiceItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoiceFile`: Exposes CRUD operations for the **InvoiceFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoiceFiles
    * const invoiceFiles = await prisma.invoiceFile.findMany()
    * ```
    */
  get invoiceFile(): Prisma.InvoiceFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recurringTransaction`: Exposes CRUD operations for the **RecurringTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecurringTransactions
    * const recurringTransactions = await prisma.recurringTransaction.findMany()
    * ```
    */
  get recurringTransaction(): Prisma.RecurringTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.salaryPayment`: Exposes CRUD operations for the **SalaryPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SalaryPayments
    * const salaryPayments = await prisma.salaryPayment.findMany()
    * ```
    */
  get salaryPayment(): Prisma.SalaryPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaveRequest`: Exposes CRUD operations for the **LeaveRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveRequests
    * const leaveRequests = await prisma.leaveRequest.findMany()
    * ```
    */
  get leaveRequest(): Prisma.LeaveRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeDocument`: Exposes CRUD operations for the **EmployeeDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeDocuments
    * const employeeDocuments = await prisma.employeeDocument.findMany()
    * ```
    */
  get employeeDocument(): Prisma.EmployeeDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeLeaveBalance`: Exposes CRUD operations for the **EmployeeLeaveBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeLeaveBalances
    * const employeeLeaveBalances = await prisma.employeeLeaveBalance.findMany()
    * ```
    */
  get employeeLeaveBalance(): Prisma.EmployeeLeaveBalanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bonusType`: Exposes CRUD operations for the **BonusType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BonusTypes
    * const bonusTypes = await prisma.bonusType.findMany()
    * ```
    */
  get bonusType(): Prisma.BonusTypeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Invoice: 'Invoice',
    InvoiceItem: 'InvoiceItem',
    Contact: 'Contact',
    Expense: 'Expense',
    InvoiceFile: 'InvoiceFile',
    RecurringTransaction: 'RecurringTransaction',
    User: 'User',
    Employee: 'Employee',
    SalaryPayment: 'SalaryPayment',
    LeaveRequest: 'LeaveRequest',
    EmployeeDocument: 'EmployeeDocument',
    EmployeeLeaveBalance: 'EmployeeLeaveBalance',
    BonusType: 'BonusType'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "invoice" | "invoiceItem" | "contact" | "expense" | "invoiceFile" | "recurringTransaction" | "user" | "employee" | "salaryPayment" | "leaveRequest" | "employeeDocument" | "employeeLeaveBalance" | "bonusType"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      InvoiceItem: {
        payload: Prisma.$InvoiceItemPayload<ExtArgs>
        fields: Prisma.InvoiceItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          findFirst: {
            args: Prisma.InvoiceItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          findMany: {
            args: Prisma.InvoiceItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>[]
          }
          create: {
            args: Prisma.InvoiceItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          createMany: {
            args: Prisma.InvoiceItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>[]
          }
          delete: {
            args: Prisma.InvoiceItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          update: {
            args: Prisma.InvoiceItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          deleteMany: {
            args: Prisma.InvoiceItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>[]
          }
          upsert: {
            args: Prisma.InvoiceItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          aggregate: {
            args: Prisma.InvoiceItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoiceItem>
          }
          groupBy: {
            args: Prisma.InvoiceItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceItemCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceItemCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      InvoiceFile: {
        payload: Prisma.$InvoiceFilePayload<ExtArgs>
        fields: Prisma.InvoiceFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>
          }
          findMany: {
            args: Prisma.InvoiceFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>[]
          }
          create: {
            args: Prisma.InvoiceFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>
          }
          createMany: {
            args: Prisma.InvoiceFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>[]
          }
          delete: {
            args: Prisma.InvoiceFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>
          }
          update: {
            args: Prisma.InvoiceFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceFilePayload>
          }
          aggregate: {
            args: Prisma.InvoiceFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoiceFile>
          }
          groupBy: {
            args: Prisma.InvoiceFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceFileCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceFileCountAggregateOutputType> | number
          }
        }
      }
      RecurringTransaction: {
        payload: Prisma.$RecurringTransactionPayload<ExtArgs>
        fields: Prisma.RecurringTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecurringTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecurringTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>
          }
          findFirst: {
            args: Prisma.RecurringTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecurringTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>
          }
          findMany: {
            args: Prisma.RecurringTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>[]
          }
          create: {
            args: Prisma.RecurringTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>
          }
          createMany: {
            args: Prisma.RecurringTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecurringTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>[]
          }
          delete: {
            args: Prisma.RecurringTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>
          }
          update: {
            args: Prisma.RecurringTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>
          }
          deleteMany: {
            args: Prisma.RecurringTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecurringTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecurringTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>[]
          }
          upsert: {
            args: Prisma.RecurringTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurringTransactionPayload>
          }
          aggregate: {
            args: Prisma.RecurringTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecurringTransaction>
          }
          groupBy: {
            args: Prisma.RecurringTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecurringTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecurringTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<RecurringTransactionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      SalaryPayment: {
        payload: Prisma.$SalaryPaymentPayload<ExtArgs>
        fields: Prisma.SalaryPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SalaryPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SalaryPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>
          }
          findFirst: {
            args: Prisma.SalaryPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SalaryPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>
          }
          findMany: {
            args: Prisma.SalaryPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>[]
          }
          create: {
            args: Prisma.SalaryPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>
          }
          createMany: {
            args: Prisma.SalaryPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SalaryPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>[]
          }
          delete: {
            args: Prisma.SalaryPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>
          }
          update: {
            args: Prisma.SalaryPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>
          }
          deleteMany: {
            args: Prisma.SalaryPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SalaryPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SalaryPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>[]
          }
          upsert: {
            args: Prisma.SalaryPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaryPaymentPayload>
          }
          aggregate: {
            args: Prisma.SalaryPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSalaryPayment>
          }
          groupBy: {
            args: Prisma.SalaryPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SalaryPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SalaryPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<SalaryPaymentCountAggregateOutputType> | number
          }
        }
      }
      LeaveRequest: {
        payload: Prisma.$LeaveRequestPayload<ExtArgs>
        fields: Prisma.LeaveRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          findFirst: {
            args: Prisma.LeaveRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          findMany: {
            args: Prisma.LeaveRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          create: {
            args: Prisma.LeaveRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          createMany: {
            args: Prisma.LeaveRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          delete: {
            args: Prisma.LeaveRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          update: {
            args: Prisma.LeaveRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          deleteMany: {
            args: Prisma.LeaveRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          upsert: {
            args: Prisma.LeaveRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          aggregate: {
            args: Prisma.LeaveRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveRequest>
          }
          groupBy: {
            args: Prisma.LeaveRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveRequestCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveRequestCountAggregateOutputType> | number
          }
        }
      }
      EmployeeDocument: {
        payload: Prisma.$EmployeeDocumentPayload<ExtArgs>
        fields: Prisma.EmployeeDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>
          }
          findFirst: {
            args: Prisma.EmployeeDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>
          }
          findMany: {
            args: Prisma.EmployeeDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>[]
          }
          create: {
            args: Prisma.EmployeeDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>
          }
          createMany: {
            args: Prisma.EmployeeDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>[]
          }
          delete: {
            args: Prisma.EmployeeDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>
          }
          update: {
            args: Prisma.EmployeeDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeDocumentPayload>
          }
          aggregate: {
            args: Prisma.EmployeeDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeDocument>
          }
          groupBy: {
            args: Prisma.EmployeeDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeDocumentCountAggregateOutputType> | number
          }
        }
      }
      EmployeeLeaveBalance: {
        payload: Prisma.$EmployeeLeaveBalancePayload<ExtArgs>
        fields: Prisma.EmployeeLeaveBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeLeaveBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeLeaveBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>
          }
          findFirst: {
            args: Prisma.EmployeeLeaveBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeLeaveBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>
          }
          findMany: {
            args: Prisma.EmployeeLeaveBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>[]
          }
          create: {
            args: Prisma.EmployeeLeaveBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>
          }
          createMany: {
            args: Prisma.EmployeeLeaveBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeLeaveBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>[]
          }
          delete: {
            args: Prisma.EmployeeLeaveBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>
          }
          update: {
            args: Prisma.EmployeeLeaveBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeLeaveBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeLeaveBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeLeaveBalanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeLeaveBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLeaveBalancePayload>
          }
          aggregate: {
            args: Prisma.EmployeeLeaveBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeLeaveBalance>
          }
          groupBy: {
            args: Prisma.EmployeeLeaveBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeLeaveBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeLeaveBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeLeaveBalanceCountAggregateOutputType> | number
          }
        }
      }
      BonusType: {
        payload: Prisma.$BonusTypePayload<ExtArgs>
        fields: Prisma.BonusTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BonusTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BonusTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>
          }
          findFirst: {
            args: Prisma.BonusTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BonusTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>
          }
          findMany: {
            args: Prisma.BonusTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>[]
          }
          create: {
            args: Prisma.BonusTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>
          }
          createMany: {
            args: Prisma.BonusTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BonusTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>[]
          }
          delete: {
            args: Prisma.BonusTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>
          }
          update: {
            args: Prisma.BonusTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>
          }
          deleteMany: {
            args: Prisma.BonusTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BonusTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BonusTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>[]
          }
          upsert: {
            args: Prisma.BonusTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BonusTypePayload>
          }
          aggregate: {
            args: Prisma.BonusTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBonusType>
          }
          groupBy: {
            args: Prisma.BonusTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BonusTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.BonusTypeCountArgs<ExtArgs>
            result: $Utils.Optional<BonusTypeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    invoice?: InvoiceOmit
    invoiceItem?: InvoiceItemOmit
    contact?: ContactOmit
    expense?: ExpenseOmit
    invoiceFile?: InvoiceFileOmit
    recurringTransaction?: RecurringTransactionOmit
    user?: UserOmit
    employee?: EmployeeOmit
    salaryPayment?: SalaryPaymentOmit
    leaveRequest?: LeaveRequestOmit
    employeeDocument?: EmployeeDocumentOmit
    employeeLeaveBalance?: EmployeeLeaveBalanceOmit
    bonusType?: BonusTypeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type InvoiceCountOutputType
   */

  export type InvoiceCountOutputType = {
    InvoiceFile: number
    items: number
  }

  export type InvoiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InvoiceFile?: boolean | InvoiceCountOutputTypeCountInvoiceFileArgs
    items?: boolean | InvoiceCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceCountOutputType
     */
    select?: InvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountInvoiceFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceFileWhereInput
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceItemWhereInput
  }


  /**
   * Count Type ContactCountOutputType
   */

  export type ContactCountOutputType = {
    Expense: number
    invoices: number
    Invoice_Invoice_supplierIdToContact: number
    RecurringTransaction: number
  }

  export type ContactCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Expense?: boolean | ContactCountOutputTypeCountExpenseArgs
    invoices?: boolean | ContactCountOutputTypeCountInvoicesArgs
    Invoice_Invoice_supplierIdToContact?: boolean | ContactCountOutputTypeCountInvoice_Invoice_supplierIdToContactArgs
    RecurringTransaction?: boolean | ContactCountOutputTypeCountRecurringTransactionArgs
  }

  // Custom InputTypes
  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactCountOutputType
     */
    select?: ContactCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountInvoice_Invoice_supplierIdToContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountRecurringTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurringTransactionWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    salaryPayments: number
    leaveRequests: number
    documents: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    salaryPayments?: boolean | EmployeeCountOutputTypeCountSalaryPaymentsArgs
    leaveRequests?: boolean | EmployeeCountOutputTypeCountLeaveRequestsArgs
    documents?: boolean | EmployeeCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountSalaryPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalaryPaymentWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountLeaveRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveRequestWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeDocumentWhereInput
  }


  /**
   * Count Type BonusTypeCountOutputType
   */

  export type BonusTypeCountOutputType = {
    payments: number
  }

  export type BonusTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | BonusTypeCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * BonusTypeCountOutputType without action
   */
  export type BonusTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusTypeCountOutputType
     */
    select?: BonusTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BonusTypeCountOutputType without action
   */
  export type BonusTypeCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalaryPaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    amount: Decimal | null
    taxRate: Decimal | null
    taxAmount: Decimal | null
    totalAmount: Decimal | null
  }

  export type InvoiceSumAggregateOutputType = {
    amount: Decimal | null
    taxRate: Decimal | null
    taxAmount: Decimal | null
    totalAmount: Decimal | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    dueDate: Date | null
    amount: Decimal | null
    taxRate: Decimal | null
    taxAmount: Decimal | null
    totalAmount: Decimal | null
    isPaid: boolean | null
    paymentDate: Date | null
    status: string | null
    type: string | null
    notes: string | null
    customerId: string | null
    supplierId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    issuerAddress: string | null
    issuerName: string | null
    issuerTaxId: string | null
    recipientAddress: string | null
    recipientName: string | null
    recipientTaxId: string | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    dueDate: Date | null
    amount: Decimal | null
    taxRate: Decimal | null
    taxAmount: Decimal | null
    totalAmount: Decimal | null
    isPaid: boolean | null
    paymentDate: Date | null
    status: string | null
    type: string | null
    notes: string | null
    customerId: string | null
    supplierId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    issuerAddress: string | null
    issuerName: string | null
    issuerTaxId: string | null
    recipientAddress: string | null
    recipientName: string | null
    recipientTaxId: string | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    invoiceNumber: number
    invoiceDate: number
    dueDate: number
    amount: number
    taxRate: number
    taxAmount: number
    totalAmount: number
    isPaid: number
    paymentDate: number
    status: number
    type: number
    notes: number
    customerId: number
    supplierId: number
    createdAt: number
    updatedAt: number
    issuerAddress: number
    issuerName: number
    issuerTaxId: number
    recipientAddress: number
    recipientName: number
    recipientTaxId: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    amount?: true
    taxRate?: true
    taxAmount?: true
    totalAmount?: true
  }

  export type InvoiceSumAggregateInputType = {
    amount?: true
    taxRate?: true
    taxAmount?: true
    totalAmount?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    invoiceNumber?: true
    invoiceDate?: true
    dueDate?: true
    amount?: true
    taxRate?: true
    taxAmount?: true
    totalAmount?: true
    isPaid?: true
    paymentDate?: true
    status?: true
    type?: true
    notes?: true
    customerId?: true
    supplierId?: true
    createdAt?: true
    updatedAt?: true
    issuerAddress?: true
    issuerName?: true
    issuerTaxId?: true
    recipientAddress?: true
    recipientName?: true
    recipientTaxId?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    invoiceNumber?: true
    invoiceDate?: true
    dueDate?: true
    amount?: true
    taxRate?: true
    taxAmount?: true
    totalAmount?: true
    isPaid?: true
    paymentDate?: true
    status?: true
    type?: true
    notes?: true
    customerId?: true
    supplierId?: true
    createdAt?: true
    updatedAt?: true
    issuerAddress?: true
    issuerName?: true
    issuerTaxId?: true
    recipientAddress?: true
    recipientName?: true
    recipientTaxId?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    invoiceNumber?: true
    invoiceDate?: true
    dueDate?: true
    amount?: true
    taxRate?: true
    taxAmount?: true
    totalAmount?: true
    isPaid?: true
    paymentDate?: true
    status?: true
    type?: true
    notes?: true
    customerId?: true
    supplierId?: true
    createdAt?: true
    updatedAt?: true
    issuerAddress?: true
    issuerName?: true
    issuerTaxId?: true
    recipientAddress?: true
    recipientName?: true
    recipientTaxId?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    invoiceNumber: string
    invoiceDate: Date | null
    dueDate: Date | null
    amount: Decimal | null
    taxRate: Decimal | null
    taxAmount: Decimal | null
    totalAmount: Decimal
    isPaid: boolean
    paymentDate: Date | null
    status: string
    type: string | null
    notes: string | null
    customerId: string | null
    supplierId: string | null
    createdAt: Date
    updatedAt: Date
    issuerAddress: string | null
    issuerName: string | null
    issuerTaxId: string | null
    recipientAddress: string | null
    recipientName: string | null
    recipientTaxId: string | null
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    amount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    isPaid?: boolean
    paymentDate?: boolean
    status?: boolean
    type?: boolean
    notes?: boolean
    customerId?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    issuerAddress?: boolean
    issuerName?: boolean
    issuerTaxId?: boolean
    recipientAddress?: boolean
    recipientName?: boolean
    recipientTaxId?: boolean
    customer?: boolean | Invoice$customerArgs<ExtArgs>
    Contact_Invoice_supplierIdToContact?: boolean | Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>
    InvoiceFile?: boolean | Invoice$InvoiceFileArgs<ExtArgs>
    items?: boolean | Invoice$itemsArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    amount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    isPaid?: boolean
    paymentDate?: boolean
    status?: boolean
    type?: boolean
    notes?: boolean
    customerId?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    issuerAddress?: boolean
    issuerName?: boolean
    issuerTaxId?: boolean
    recipientAddress?: boolean
    recipientName?: boolean
    recipientTaxId?: boolean
    customer?: boolean | Invoice$customerArgs<ExtArgs>
    Contact_Invoice_supplierIdToContact?: boolean | Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    amount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    isPaid?: boolean
    paymentDate?: boolean
    status?: boolean
    type?: boolean
    notes?: boolean
    customerId?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    issuerAddress?: boolean
    issuerName?: boolean
    issuerTaxId?: boolean
    recipientAddress?: boolean
    recipientName?: boolean
    recipientTaxId?: boolean
    customer?: boolean | Invoice$customerArgs<ExtArgs>
    Contact_Invoice_supplierIdToContact?: boolean | Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    amount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    isPaid?: boolean
    paymentDate?: boolean
    status?: boolean
    type?: boolean
    notes?: boolean
    customerId?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    issuerAddress?: boolean
    issuerName?: boolean
    issuerTaxId?: boolean
    recipientAddress?: boolean
    recipientName?: boolean
    recipientTaxId?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceNumber" | "invoiceDate" | "dueDate" | "amount" | "taxRate" | "taxAmount" | "totalAmount" | "isPaid" | "paymentDate" | "status" | "type" | "notes" | "customerId" | "supplierId" | "createdAt" | "updatedAt" | "issuerAddress" | "issuerName" | "issuerTaxId" | "recipientAddress" | "recipientName" | "recipientTaxId", ExtArgs["result"]["invoice"]>
  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Invoice$customerArgs<ExtArgs>
    Contact_Invoice_supplierIdToContact?: boolean | Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>
    InvoiceFile?: boolean | Invoice$InvoiceFileArgs<ExtArgs>
    items?: boolean | Invoice$itemsArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Invoice$customerArgs<ExtArgs>
    Contact_Invoice_supplierIdToContact?: boolean | Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>
  }
  export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Invoice$customerArgs<ExtArgs>
    Contact_Invoice_supplierIdToContact?: boolean | Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      customer: Prisma.$ContactPayload<ExtArgs> | null
      Contact_Invoice_supplierIdToContact: Prisma.$ContactPayload<ExtArgs> | null
      InvoiceFile: Prisma.$InvoiceFilePayload<ExtArgs>[]
      items: Prisma.$InvoiceItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNumber: string
      invoiceDate: Date | null
      dueDate: Date | null
      amount: Prisma.Decimal | null
      taxRate: Prisma.Decimal | null
      taxAmount: Prisma.Decimal | null
      totalAmount: Prisma.Decimal
      isPaid: boolean
      paymentDate: Date | null
      status: string
      type: string | null
      notes: string | null
      customerId: string | null
      supplierId: string | null
      createdAt: Date
      updatedAt: Date
      issuerAddress: string | null
      issuerName: string | null
      issuerTaxId: string | null
      recipientAddress: string | null
      recipientName: string | null
      recipientTaxId: string | null
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends Invoice$customerArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$customerArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Contact_Invoice_supplierIdToContact<T extends Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    InvoiceFile<T extends Invoice$InvoiceFileArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$InvoiceFileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends Invoice$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly invoiceNumber: FieldRef<"Invoice", 'String'>
    readonly invoiceDate: FieldRef<"Invoice", 'DateTime'>
    readonly dueDate: FieldRef<"Invoice", 'DateTime'>
    readonly amount: FieldRef<"Invoice", 'Decimal'>
    readonly taxRate: FieldRef<"Invoice", 'Decimal'>
    readonly taxAmount: FieldRef<"Invoice", 'Decimal'>
    readonly totalAmount: FieldRef<"Invoice", 'Decimal'>
    readonly isPaid: FieldRef<"Invoice", 'Boolean'>
    readonly paymentDate: FieldRef<"Invoice", 'DateTime'>
    readonly status: FieldRef<"Invoice", 'String'>
    readonly type: FieldRef<"Invoice", 'String'>
    readonly notes: FieldRef<"Invoice", 'String'>
    readonly customerId: FieldRef<"Invoice", 'String'>
    readonly supplierId: FieldRef<"Invoice", 'String'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
    readonly issuerAddress: FieldRef<"Invoice", 'String'>
    readonly issuerName: FieldRef<"Invoice", 'String'>
    readonly issuerTaxId: FieldRef<"Invoice", 'String'>
    readonly recipientAddress: FieldRef<"Invoice", 'String'>
    readonly recipientName: FieldRef<"Invoice", 'String'>
    readonly recipientTaxId: FieldRef<"Invoice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice.customer
   */
  export type Invoice$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Invoice.Contact_Invoice_supplierIdToContact
   */
  export type Invoice$Contact_Invoice_supplierIdToContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Invoice.InvoiceFile
   */
  export type Invoice$InvoiceFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    where?: InvoiceFileWhereInput
    orderBy?: InvoiceFileOrderByWithRelationInput | InvoiceFileOrderByWithRelationInput[]
    cursor?: InvoiceFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceFileScalarFieldEnum | InvoiceFileScalarFieldEnum[]
  }

  /**
   * Invoice.items
   */
  export type Invoice$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    where?: InvoiceItemWhereInput
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    cursor?: InvoiceItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model InvoiceItem
   */

  export type AggregateInvoiceItem = {
    _count: InvoiceItemCountAggregateOutputType | null
    _avg: InvoiceItemAvgAggregateOutputType | null
    _sum: InvoiceItemSumAggregateOutputType | null
    _min: InvoiceItemMinAggregateOutputType | null
    _max: InvoiceItemMaxAggregateOutputType | null
  }

  export type InvoiceItemAvgAggregateOutputType = {
    quantity: Decimal | null
    unitPrice: Decimal | null
    vatRate: Decimal | null
    vatAmount: Decimal | null
    totalAmount: Decimal | null
  }

  export type InvoiceItemSumAggregateOutputType = {
    quantity: Decimal | null
    unitPrice: Decimal | null
    vatRate: Decimal | null
    vatAmount: Decimal | null
    totalAmount: Decimal | null
  }

  export type InvoiceItemMinAggregateOutputType = {
    id: string | null
    description: string | null
    quantity: Decimal | null
    unitPrice: Decimal | null
    vatRate: Decimal | null
    vatAmount: Decimal | null
    totalAmount: Decimal | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceItemMaxAggregateOutputType = {
    id: string | null
    description: string | null
    quantity: Decimal | null
    unitPrice: Decimal | null
    vatRate: Decimal | null
    vatAmount: Decimal | null
    totalAmount: Decimal | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceItemCountAggregateOutputType = {
    id: number
    description: number
    quantity: number
    unitPrice: number
    vatRate: number
    vatAmount: number
    totalAmount: number
    invoiceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    vatRate?: true
    vatAmount?: true
    totalAmount?: true
  }

  export type InvoiceItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    vatRate?: true
    vatAmount?: true
    totalAmount?: true
  }

  export type InvoiceItemMinAggregateInputType = {
    id?: true
    description?: true
    quantity?: true
    unitPrice?: true
    vatRate?: true
    vatAmount?: true
    totalAmount?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceItemMaxAggregateInputType = {
    id?: true
    description?: true
    quantity?: true
    unitPrice?: true
    vatRate?: true
    vatAmount?: true
    totalAmount?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceItemCountAggregateInputType = {
    id?: true
    description?: true
    quantity?: true
    unitPrice?: true
    vatRate?: true
    vatAmount?: true
    totalAmount?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceItem to aggregate.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoiceItems
    **/
    _count?: true | InvoiceItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceItemMaxAggregateInputType
  }

  export type GetInvoiceItemAggregateType<T extends InvoiceItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoiceItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoiceItem[P]>
      : GetScalarType<T[P], AggregateInvoiceItem[P]>
  }




  export type InvoiceItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceItemWhereInput
    orderBy?: InvoiceItemOrderByWithAggregationInput | InvoiceItemOrderByWithAggregationInput[]
    by: InvoiceItemScalarFieldEnum[] | InvoiceItemScalarFieldEnum
    having?: InvoiceItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceItemCountAggregateInputType | true
    _avg?: InvoiceItemAvgAggregateInputType
    _sum?: InvoiceItemSumAggregateInputType
    _min?: InvoiceItemMinAggregateInputType
    _max?: InvoiceItemMaxAggregateInputType
  }

  export type InvoiceItemGroupByOutputType = {
    id: string
    description: string
    quantity: Decimal
    unitPrice: Decimal
    vatRate: Decimal
    vatAmount: Decimal
    totalAmount: Decimal
    invoiceId: string
    createdAt: Date
    updatedAt: Date
    _count: InvoiceItemCountAggregateOutputType | null
    _avg: InvoiceItemAvgAggregateOutputType | null
    _sum: InvoiceItemSumAggregateOutputType | null
    _min: InvoiceItemMinAggregateOutputType | null
    _max: InvoiceItemMaxAggregateOutputType | null
  }

  type GetInvoiceItemGroupByPayload<T extends InvoiceItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceItemGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceItemGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    vatRate?: boolean
    vatAmount?: boolean
    totalAmount?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceItem"]>

  export type InvoiceItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    vatRate?: boolean
    vatAmount?: boolean
    totalAmount?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceItem"]>

  export type InvoiceItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    vatRate?: boolean
    vatAmount?: boolean
    totalAmount?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceItem"]>

  export type InvoiceItemSelectScalar = {
    id?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    vatRate?: boolean
    vatAmount?: boolean
    totalAmount?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "quantity" | "unitPrice" | "vatRate" | "vatAmount" | "totalAmount" | "invoiceId" | "createdAt" | "updatedAt", ExtArgs["result"]["invoiceItem"]>
  export type InvoiceItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type InvoiceItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type InvoiceItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }

  export type $InvoiceItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoiceItem"
    objects: {
      invoice: Prisma.$InvoicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      quantity: Prisma.Decimal
      unitPrice: Prisma.Decimal
      vatRate: Prisma.Decimal
      vatAmount: Prisma.Decimal
      totalAmount: Prisma.Decimal
      invoiceId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoiceItem"]>
    composites: {}
  }

  type InvoiceItemGetPayload<S extends boolean | null | undefined | InvoiceItemDefaultArgs> = $Result.GetResult<Prisma.$InvoiceItemPayload, S>

  type InvoiceItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceItemCountAggregateInputType | true
    }

  export interface InvoiceItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoiceItem'], meta: { name: 'InvoiceItem' } }
    /**
     * Find zero or one InvoiceItem that matches the filter.
     * @param {InvoiceItemFindUniqueArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceItemFindUniqueArgs>(args: SelectSubset<T, InvoiceItemFindUniqueArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvoiceItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceItemFindUniqueOrThrowArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceItemFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemFindFirstArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceItemFindFirstArgs>(args?: SelectSubset<T, InvoiceItemFindFirstArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemFindFirstOrThrowArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceItemFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvoiceItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoiceItems
     * const invoiceItems = await prisma.invoiceItem.findMany()
     * 
     * // Get first 10 InvoiceItems
     * const invoiceItems = await prisma.invoiceItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceItemWithIdOnly = await prisma.invoiceItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceItemFindManyArgs>(args?: SelectSubset<T, InvoiceItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvoiceItem.
     * @param {InvoiceItemCreateArgs} args - Arguments to create a InvoiceItem.
     * @example
     * // Create one InvoiceItem
     * const InvoiceItem = await prisma.invoiceItem.create({
     *   data: {
     *     // ... data to create a InvoiceItem
     *   }
     * })
     * 
     */
    create<T extends InvoiceItemCreateArgs>(args: SelectSubset<T, InvoiceItemCreateArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvoiceItems.
     * @param {InvoiceItemCreateManyArgs} args - Arguments to create many InvoiceItems.
     * @example
     * // Create many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceItemCreateManyArgs>(args?: SelectSubset<T, InvoiceItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoiceItems and returns the data saved in the database.
     * @param {InvoiceItemCreateManyAndReturnArgs} args - Arguments to create many InvoiceItems.
     * @example
     * // Create many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoiceItems and only return the `id`
     * const invoiceItemWithIdOnly = await prisma.invoiceItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceItemCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InvoiceItem.
     * @param {InvoiceItemDeleteArgs} args - Arguments to delete one InvoiceItem.
     * @example
     * // Delete one InvoiceItem
     * const InvoiceItem = await prisma.invoiceItem.delete({
     *   where: {
     *     // ... filter to delete one InvoiceItem
     *   }
     * })
     * 
     */
    delete<T extends InvoiceItemDeleteArgs>(args: SelectSubset<T, InvoiceItemDeleteArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvoiceItem.
     * @param {InvoiceItemUpdateArgs} args - Arguments to update one InvoiceItem.
     * @example
     * // Update one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceItemUpdateArgs>(args: SelectSubset<T, InvoiceItemUpdateArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvoiceItems.
     * @param {InvoiceItemDeleteManyArgs} args - Arguments to filter InvoiceItems to delete.
     * @example
     * // Delete a few InvoiceItems
     * const { count } = await prisma.invoiceItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceItemDeleteManyArgs>(args?: SelectSubset<T, InvoiceItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceItemUpdateManyArgs>(args: SelectSubset<T, InvoiceItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceItems and returns the data updated in the database.
     * @param {InvoiceItemUpdateManyAndReturnArgs} args - Arguments to update many InvoiceItems.
     * @example
     * // Update many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InvoiceItems and only return the `id`
     * const invoiceItemWithIdOnly = await prisma.invoiceItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceItemUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InvoiceItem.
     * @param {InvoiceItemUpsertArgs} args - Arguments to update or create a InvoiceItem.
     * @example
     * // Update or create a InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.upsert({
     *   create: {
     *     // ... data to create a InvoiceItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoiceItem we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceItemUpsertArgs>(args: SelectSubset<T, InvoiceItemUpsertArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvoiceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemCountArgs} args - Arguments to filter InvoiceItems to count.
     * @example
     * // Count the number of InvoiceItems
     * const count = await prisma.invoiceItem.count({
     *   where: {
     *     // ... the filter for the InvoiceItems we want to count
     *   }
     * })
    **/
    count<T extends InvoiceItemCountArgs>(
      args?: Subset<T, InvoiceItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoiceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceItemAggregateArgs>(args: Subset<T, InvoiceItemAggregateArgs>): Prisma.PrismaPromise<GetInvoiceItemAggregateType<T>>

    /**
     * Group by InvoiceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceItemGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoiceItem model
   */
  readonly fields: InvoiceItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoiceItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends InvoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceDefaultArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoiceItem model
   */
  interface InvoiceItemFieldRefs {
    readonly id: FieldRef<"InvoiceItem", 'String'>
    readonly description: FieldRef<"InvoiceItem", 'String'>
    readonly quantity: FieldRef<"InvoiceItem", 'Decimal'>
    readonly unitPrice: FieldRef<"InvoiceItem", 'Decimal'>
    readonly vatRate: FieldRef<"InvoiceItem", 'Decimal'>
    readonly vatAmount: FieldRef<"InvoiceItem", 'Decimal'>
    readonly totalAmount: FieldRef<"InvoiceItem", 'Decimal'>
    readonly invoiceId: FieldRef<"InvoiceItem", 'String'>
    readonly createdAt: FieldRef<"InvoiceItem", 'DateTime'>
    readonly updatedAt: FieldRef<"InvoiceItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoiceItem findUnique
   */
  export type InvoiceItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem findUniqueOrThrow
   */
  export type InvoiceItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem findFirst
   */
  export type InvoiceItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceItems.
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceItems.
     */
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoiceItem findFirstOrThrow
   */
  export type InvoiceItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceItems.
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceItems.
     */
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoiceItem findMany
   */
  export type InvoiceItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItems to fetch.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoiceItems.
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoiceItem create
   */
  export type InvoiceItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * The data needed to create a InvoiceItem.
     */
    data: XOR<InvoiceItemCreateInput, InvoiceItemUncheckedCreateInput>
  }

  /**
   * InvoiceItem createMany
   */
  export type InvoiceItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoiceItems.
     */
    data: InvoiceItemCreateManyInput | InvoiceItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoiceItem createManyAndReturn
   */
  export type InvoiceItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * The data used to create many InvoiceItems.
     */
    data: InvoiceItemCreateManyInput | InvoiceItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceItem update
   */
  export type InvoiceItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * The data needed to update a InvoiceItem.
     */
    data: XOR<InvoiceItemUpdateInput, InvoiceItemUncheckedUpdateInput>
    /**
     * Choose, which InvoiceItem to update.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem updateMany
   */
  export type InvoiceItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoiceItems.
     */
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceItems to update
     */
    where?: InvoiceItemWhereInput
    /**
     * Limit how many InvoiceItems to update.
     */
    limit?: number
  }

  /**
   * InvoiceItem updateManyAndReturn
   */
  export type InvoiceItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * The data used to update InvoiceItems.
     */
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceItems to update
     */
    where?: InvoiceItemWhereInput
    /**
     * Limit how many InvoiceItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceItem upsert
   */
  export type InvoiceItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * The filter to search for the InvoiceItem to update in case it exists.
     */
    where: InvoiceItemWhereUniqueInput
    /**
     * In case the InvoiceItem found by the `where` argument doesn't exist, create a new InvoiceItem with this data.
     */
    create: XOR<InvoiceItemCreateInput, InvoiceItemUncheckedCreateInput>
    /**
     * In case the InvoiceItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceItemUpdateInput, InvoiceItemUncheckedUpdateInput>
  }

  /**
   * InvoiceItem delete
   */
  export type InvoiceItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter which InvoiceItem to delete.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem deleteMany
   */
  export type InvoiceItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceItems to delete
     */
    where?: InvoiceItemWhereInput
    /**
     * Limit how many InvoiceItems to delete.
     */
    limit?: number
  }

  /**
   * InvoiceItem without action
   */
  export type InvoiceItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    name: string | null
    taxNumber: string | null
    taxOffice: string | null
    address: string | null
    phone: string | null
    email: string | null
    isCustomer: boolean | null
    isSupplier: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    name: string | null
    taxNumber: string | null
    taxOffice: string | null
    address: string | null
    phone: string | null
    email: string | null
    isCustomer: boolean | null
    isSupplier: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    name: number
    taxNumber: number
    taxOffice: number
    address: number
    phone: number
    email: number
    isCustomer: number
    isSupplier: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    name?: true
    taxNumber?: true
    taxOffice?: true
    address?: true
    phone?: true
    email?: true
    isCustomer?: true
    isSupplier?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    name?: true
    taxNumber?: true
    taxOffice?: true
    address?: true
    phone?: true
    email?: true
    isCustomer?: true
    isSupplier?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    name?: true
    taxNumber?: true
    taxOffice?: true
    address?: true
    phone?: true
    email?: true
    isCustomer?: true
    isSupplier?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    name: string
    taxNumber: string | null
    taxOffice: string | null
    address: string | null
    phone: string | null
    email: string | null
    isCustomer: boolean
    isSupplier: boolean
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    taxNumber?: boolean
    taxOffice?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Expense?: boolean | Contact$ExpenseArgs<ExtArgs>
    invoices?: boolean | Contact$invoicesArgs<ExtArgs>
    Invoice_Invoice_supplierIdToContact?: boolean | Contact$Invoice_Invoice_supplierIdToContactArgs<ExtArgs>
    RecurringTransaction?: boolean | Contact$RecurringTransactionArgs<ExtArgs>
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    taxNumber?: boolean
    taxOffice?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    taxNumber?: boolean
    taxOffice?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    name?: boolean
    taxNumber?: boolean
    taxOffice?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "taxNumber" | "taxOffice" | "address" | "phone" | "email" | "isCustomer" | "isSupplier" | "createdAt" | "updatedAt", ExtArgs["result"]["contact"]>
  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Expense?: boolean | Contact$ExpenseArgs<ExtArgs>
    invoices?: boolean | Contact$invoicesArgs<ExtArgs>
    Invoice_Invoice_supplierIdToContact?: boolean | Contact$Invoice_Invoice_supplierIdToContactArgs<ExtArgs>
    RecurringTransaction?: boolean | Contact$RecurringTransactionArgs<ExtArgs>
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      Expense: Prisma.$ExpensePayload<ExtArgs>[]
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      Invoice_Invoice_supplierIdToContact: Prisma.$InvoicePayload<ExtArgs>[]
      RecurringTransaction: Prisma.$RecurringTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      taxNumber: string | null
      taxOffice: string | null
      address: string | null
      phone: string | null
      email: string | null
      isCustomer: boolean
      isSupplier: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Expense<T extends Contact$ExpenseArgs<ExtArgs> = {}>(args?: Subset<T, Contact$ExpenseArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invoices<T extends Contact$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Contact$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Invoice_Invoice_supplierIdToContact<T extends Contact$Invoice_Invoice_supplierIdToContactArgs<ExtArgs> = {}>(args?: Subset<T, Contact$Invoice_Invoice_supplierIdToContactArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    RecurringTransaction<T extends Contact$RecurringTransactionArgs<ExtArgs> = {}>(args?: Subset<T, Contact$RecurringTransactionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly name: FieldRef<"Contact", 'String'>
    readonly taxNumber: FieldRef<"Contact", 'String'>
    readonly taxOffice: FieldRef<"Contact", 'String'>
    readonly address: FieldRef<"Contact", 'String'>
    readonly phone: FieldRef<"Contact", 'String'>
    readonly email: FieldRef<"Contact", 'String'>
    readonly isCustomer: FieldRef<"Contact", 'Boolean'>
    readonly isSupplier: FieldRef<"Contact", 'Boolean'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact.Expense
   */
  export type Contact$ExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Contact.invoices
   */
  export type Contact$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Contact.Invoice_Invoice_supplierIdToContact
   */
  export type Contact$Invoice_Invoice_supplierIdToContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Contact.RecurringTransaction
   */
  export type Contact$RecurringTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    where?: RecurringTransactionWhereInput
    orderBy?: RecurringTransactionOrderByWithRelationInput | RecurringTransactionOrderByWithRelationInput[]
    cursor?: RecurringTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecurringTransactionScalarFieldEnum | RecurringTransactionScalarFieldEnum[]
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type ExpenseSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    amount: Decimal | null
    expenseDate: Date | null
    category: string | null
    paymentMethod: string | null
    status: string | null
    receiptUrl: string | null
    supplierId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    amount: Decimal | null
    expenseDate: Date | null
    category: string | null
    paymentMethod: string | null
    status: string | null
    receiptUrl: string | null
    supplierId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    amount: number
    expenseDate: number
    category: number
    paymentMethod: number
    status: number
    receiptUrl: number
    supplierId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    amount?: true
  }

  export type ExpenseSumAggregateInputType = {
    amount?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    expenseDate?: true
    category?: true
    paymentMethod?: true
    status?: true
    receiptUrl?: true
    supplierId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    expenseDate?: true
    category?: true
    paymentMethod?: true
    status?: true
    receiptUrl?: true
    supplierId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    expenseDate?: true
    category?: true
    paymentMethod?: true
    status?: true
    receiptUrl?: true
    supplierId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    title: string
    description: string | null
    amount: Decimal
    expenseDate: Date
    category: string
    paymentMethod: string
    status: string
    receiptUrl: string | null
    supplierId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    expenseDate?: boolean
    category?: boolean
    paymentMethod?: boolean
    status?: boolean
    receiptUrl?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Contact?: boolean | Expense$ContactArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    expenseDate?: boolean
    category?: boolean
    paymentMethod?: boolean
    status?: boolean
    receiptUrl?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Contact?: boolean | Expense$ContactArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    expenseDate?: boolean
    category?: boolean
    paymentMethod?: boolean
    status?: boolean
    receiptUrl?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Contact?: boolean | Expense$ContactArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    expenseDate?: boolean
    category?: boolean
    paymentMethod?: boolean
    status?: boolean
    receiptUrl?: boolean
    supplierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExpenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "amount" | "expenseDate" | "category" | "paymentMethod" | "status" | "receiptUrl" | "supplierId" | "createdAt" | "updatedAt", ExtArgs["result"]["expense"]>
  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | Expense$ContactArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | Expense$ContactArgs<ExtArgs>
  }
  export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | Expense$ContactArgs<ExtArgs>
  }

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      Contact: Prisma.$ContactPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      amount: Prisma.Decimal
      expenseDate: Date
      category: string
      paymentMethod: string
      status: string
      receiptUrl: string | null
      supplierId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {ExpenseUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Contact<T extends Expense$ContactArgs<ExtArgs> = {}>(args?: Subset<T, Expense$ContactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly title: FieldRef<"Expense", 'String'>
    readonly description: FieldRef<"Expense", 'String'>
    readonly amount: FieldRef<"Expense", 'Decimal'>
    readonly expenseDate: FieldRef<"Expense", 'DateTime'>
    readonly category: FieldRef<"Expense", 'String'>
    readonly paymentMethod: FieldRef<"Expense", 'String'>
    readonly status: FieldRef<"Expense", 'String'>
    readonly receiptUrl: FieldRef<"Expense", 'String'>
    readonly supplierId: FieldRef<"Expense", 'String'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
    readonly updatedAt: FieldRef<"Expense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expense updateManyAndReturn
   */
  export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to delete.
     */
    limit?: number
  }

  /**
   * Expense.Contact
   */
  export type Expense$ContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model InvoiceFile
   */

  export type AggregateInvoiceFile = {
    _count: InvoiceFileCountAggregateOutputType | null
    _avg: InvoiceFileAvgAggregateOutputType | null
    _sum: InvoiceFileSumAggregateOutputType | null
    _min: InvoiceFileMinAggregateOutputType | null
    _max: InvoiceFileMaxAggregateOutputType | null
  }

  export type InvoiceFileAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type InvoiceFileSumAggregateOutputType = {
    fileSize: number | null
  }

  export type InvoiceFileMinAggregateOutputType = {
    id: string | null
    filename: string | null
    fileKey: string | null
    fileSize: number | null
    mimeType: string | null
    uploadDate: Date | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceFileMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    fileKey: string | null
    fileSize: number | null
    mimeType: string | null
    uploadDate: Date | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceFileCountAggregateOutputType = {
    id: number
    filename: number
    fileKey: number
    fileSize: number
    mimeType: number
    uploadDate: number
    invoiceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceFileAvgAggregateInputType = {
    fileSize?: true
  }

  export type InvoiceFileSumAggregateInputType = {
    fileSize?: true
  }

  export type InvoiceFileMinAggregateInputType = {
    id?: true
    filename?: true
    fileKey?: true
    fileSize?: true
    mimeType?: true
    uploadDate?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceFileMaxAggregateInputType = {
    id?: true
    filename?: true
    fileKey?: true
    fileSize?: true
    mimeType?: true
    uploadDate?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceFileCountAggregateInputType = {
    id?: true
    filename?: true
    fileKey?: true
    fileSize?: true
    mimeType?: true
    uploadDate?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceFile to aggregate.
     */
    where?: InvoiceFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceFiles to fetch.
     */
    orderBy?: InvoiceFileOrderByWithRelationInput | InvoiceFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoiceFiles
    **/
    _count?: true | InvoiceFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceFileMaxAggregateInputType
  }

  export type GetInvoiceFileAggregateType<T extends InvoiceFileAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoiceFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoiceFile[P]>
      : GetScalarType<T[P], AggregateInvoiceFile[P]>
  }




  export type InvoiceFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceFileWhereInput
    orderBy?: InvoiceFileOrderByWithAggregationInput | InvoiceFileOrderByWithAggregationInput[]
    by: InvoiceFileScalarFieldEnum[] | InvoiceFileScalarFieldEnum
    having?: InvoiceFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceFileCountAggregateInputType | true
    _avg?: InvoiceFileAvgAggregateInputType
    _sum?: InvoiceFileSumAggregateInputType
    _min?: InvoiceFileMinAggregateInputType
    _max?: InvoiceFileMaxAggregateInputType
  }

  export type InvoiceFileGroupByOutputType = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate: Date
    invoiceId: string
    createdAt: Date
    updatedAt: Date
    _count: InvoiceFileCountAggregateOutputType | null
    _avg: InvoiceFileAvgAggregateOutputType | null
    _sum: InvoiceFileSumAggregateOutputType | null
    _min: InvoiceFileMinAggregateOutputType | null
    _max: InvoiceFileMaxAggregateOutputType | null
  }

  type GetInvoiceFileGroupByPayload<T extends InvoiceFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceFileGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceFileGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceFile"]>

  export type InvoiceFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceFile"]>

  export type InvoiceFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceFile"]>

  export type InvoiceFileSelectScalar = {
    id?: boolean
    filename?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "fileKey" | "fileSize" | "mimeType" | "uploadDate" | "invoiceId" | "createdAt" | "updatedAt", ExtArgs["result"]["invoiceFile"]>
  export type InvoiceFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type InvoiceFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type InvoiceFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }

  export type $InvoiceFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoiceFile"
    objects: {
      Invoice: Prisma.$InvoicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      fileKey: string
      fileSize: number
      mimeType: string
      uploadDate: Date
      invoiceId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoiceFile"]>
    composites: {}
  }

  type InvoiceFileGetPayload<S extends boolean | null | undefined | InvoiceFileDefaultArgs> = $Result.GetResult<Prisma.$InvoiceFilePayload, S>

  type InvoiceFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceFileCountAggregateInputType | true
    }

  export interface InvoiceFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoiceFile'], meta: { name: 'InvoiceFile' } }
    /**
     * Find zero or one InvoiceFile that matches the filter.
     * @param {InvoiceFileFindUniqueArgs} args - Arguments to find a InvoiceFile
     * @example
     * // Get one InvoiceFile
     * const invoiceFile = await prisma.invoiceFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFileFindUniqueArgs>(args: SelectSubset<T, InvoiceFileFindUniqueArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvoiceFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFileFindUniqueOrThrowArgs} args - Arguments to find a InvoiceFile
     * @example
     * // Get one InvoiceFile
     * const invoiceFile = await prisma.invoiceFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFileFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileFindFirstArgs} args - Arguments to find a InvoiceFile
     * @example
     * // Get one InvoiceFile
     * const invoiceFile = await prisma.invoiceFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFileFindFirstArgs>(args?: SelectSubset<T, InvoiceFileFindFirstArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileFindFirstOrThrowArgs} args - Arguments to find a InvoiceFile
     * @example
     * // Get one InvoiceFile
     * const invoiceFile = await prisma.invoiceFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFileFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvoiceFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoiceFiles
     * const invoiceFiles = await prisma.invoiceFile.findMany()
     * 
     * // Get first 10 InvoiceFiles
     * const invoiceFiles = await prisma.invoiceFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceFileWithIdOnly = await prisma.invoiceFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFileFindManyArgs>(args?: SelectSubset<T, InvoiceFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvoiceFile.
     * @param {InvoiceFileCreateArgs} args - Arguments to create a InvoiceFile.
     * @example
     * // Create one InvoiceFile
     * const InvoiceFile = await prisma.invoiceFile.create({
     *   data: {
     *     // ... data to create a InvoiceFile
     *   }
     * })
     * 
     */
    create<T extends InvoiceFileCreateArgs>(args: SelectSubset<T, InvoiceFileCreateArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvoiceFiles.
     * @param {InvoiceFileCreateManyArgs} args - Arguments to create many InvoiceFiles.
     * @example
     * // Create many InvoiceFiles
     * const invoiceFile = await prisma.invoiceFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceFileCreateManyArgs>(args?: SelectSubset<T, InvoiceFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoiceFiles and returns the data saved in the database.
     * @param {InvoiceFileCreateManyAndReturnArgs} args - Arguments to create many InvoiceFiles.
     * @example
     * // Create many InvoiceFiles
     * const invoiceFile = await prisma.invoiceFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoiceFiles and only return the `id`
     * const invoiceFileWithIdOnly = await prisma.invoiceFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceFileCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InvoiceFile.
     * @param {InvoiceFileDeleteArgs} args - Arguments to delete one InvoiceFile.
     * @example
     * // Delete one InvoiceFile
     * const InvoiceFile = await prisma.invoiceFile.delete({
     *   where: {
     *     // ... filter to delete one InvoiceFile
     *   }
     * })
     * 
     */
    delete<T extends InvoiceFileDeleteArgs>(args: SelectSubset<T, InvoiceFileDeleteArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvoiceFile.
     * @param {InvoiceFileUpdateArgs} args - Arguments to update one InvoiceFile.
     * @example
     * // Update one InvoiceFile
     * const invoiceFile = await prisma.invoiceFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceFileUpdateArgs>(args: SelectSubset<T, InvoiceFileUpdateArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvoiceFiles.
     * @param {InvoiceFileDeleteManyArgs} args - Arguments to filter InvoiceFiles to delete.
     * @example
     * // Delete a few InvoiceFiles
     * const { count } = await prisma.invoiceFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceFileDeleteManyArgs>(args?: SelectSubset<T, InvoiceFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoiceFiles
     * const invoiceFile = await prisma.invoiceFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceFileUpdateManyArgs>(args: SelectSubset<T, InvoiceFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceFiles and returns the data updated in the database.
     * @param {InvoiceFileUpdateManyAndReturnArgs} args - Arguments to update many InvoiceFiles.
     * @example
     * // Update many InvoiceFiles
     * const invoiceFile = await prisma.invoiceFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InvoiceFiles and only return the `id`
     * const invoiceFileWithIdOnly = await prisma.invoiceFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceFileUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InvoiceFile.
     * @param {InvoiceFileUpsertArgs} args - Arguments to update or create a InvoiceFile.
     * @example
     * // Update or create a InvoiceFile
     * const invoiceFile = await prisma.invoiceFile.upsert({
     *   create: {
     *     // ... data to create a InvoiceFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoiceFile we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceFileUpsertArgs>(args: SelectSubset<T, InvoiceFileUpsertArgs<ExtArgs>>): Prisma__InvoiceFileClient<$Result.GetResult<Prisma.$InvoiceFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvoiceFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileCountArgs} args - Arguments to filter InvoiceFiles to count.
     * @example
     * // Count the number of InvoiceFiles
     * const count = await prisma.invoiceFile.count({
     *   where: {
     *     // ... the filter for the InvoiceFiles we want to count
     *   }
     * })
    **/
    count<T extends InvoiceFileCountArgs>(
      args?: Subset<T, InvoiceFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoiceFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceFileAggregateArgs>(args: Subset<T, InvoiceFileAggregateArgs>): Prisma.PrismaPromise<GetInvoiceFileAggregateType<T>>

    /**
     * Group by InvoiceFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceFileGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoiceFile model
   */
  readonly fields: InvoiceFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoiceFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Invoice<T extends InvoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceDefaultArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoiceFile model
   */
  interface InvoiceFileFieldRefs {
    readonly id: FieldRef<"InvoiceFile", 'String'>
    readonly filename: FieldRef<"InvoiceFile", 'String'>
    readonly fileKey: FieldRef<"InvoiceFile", 'String'>
    readonly fileSize: FieldRef<"InvoiceFile", 'Int'>
    readonly mimeType: FieldRef<"InvoiceFile", 'String'>
    readonly uploadDate: FieldRef<"InvoiceFile", 'DateTime'>
    readonly invoiceId: FieldRef<"InvoiceFile", 'String'>
    readonly createdAt: FieldRef<"InvoiceFile", 'DateTime'>
    readonly updatedAt: FieldRef<"InvoiceFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoiceFile findUnique
   */
  export type InvoiceFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceFile to fetch.
     */
    where: InvoiceFileWhereUniqueInput
  }

  /**
   * InvoiceFile findUniqueOrThrow
   */
  export type InvoiceFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceFile to fetch.
     */
    where: InvoiceFileWhereUniqueInput
  }

  /**
   * InvoiceFile findFirst
   */
  export type InvoiceFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceFile to fetch.
     */
    where?: InvoiceFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceFiles to fetch.
     */
    orderBy?: InvoiceFileOrderByWithRelationInput | InvoiceFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceFiles.
     */
    cursor?: InvoiceFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceFiles.
     */
    distinct?: InvoiceFileScalarFieldEnum | InvoiceFileScalarFieldEnum[]
  }

  /**
   * InvoiceFile findFirstOrThrow
   */
  export type InvoiceFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceFile to fetch.
     */
    where?: InvoiceFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceFiles to fetch.
     */
    orderBy?: InvoiceFileOrderByWithRelationInput | InvoiceFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceFiles.
     */
    cursor?: InvoiceFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceFiles.
     */
    distinct?: InvoiceFileScalarFieldEnum | InvoiceFileScalarFieldEnum[]
  }

  /**
   * InvoiceFile findMany
   */
  export type InvoiceFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceFiles to fetch.
     */
    where?: InvoiceFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceFiles to fetch.
     */
    orderBy?: InvoiceFileOrderByWithRelationInput | InvoiceFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoiceFiles.
     */
    cursor?: InvoiceFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceFiles.
     */
    skip?: number
    distinct?: InvoiceFileScalarFieldEnum | InvoiceFileScalarFieldEnum[]
  }

  /**
   * InvoiceFile create
   */
  export type InvoiceFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * The data needed to create a InvoiceFile.
     */
    data: XOR<InvoiceFileCreateInput, InvoiceFileUncheckedCreateInput>
  }

  /**
   * InvoiceFile createMany
   */
  export type InvoiceFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoiceFiles.
     */
    data: InvoiceFileCreateManyInput | InvoiceFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoiceFile createManyAndReturn
   */
  export type InvoiceFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * The data used to create many InvoiceFiles.
     */
    data: InvoiceFileCreateManyInput | InvoiceFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceFile update
   */
  export type InvoiceFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * The data needed to update a InvoiceFile.
     */
    data: XOR<InvoiceFileUpdateInput, InvoiceFileUncheckedUpdateInput>
    /**
     * Choose, which InvoiceFile to update.
     */
    where: InvoiceFileWhereUniqueInput
  }

  /**
   * InvoiceFile updateMany
   */
  export type InvoiceFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoiceFiles.
     */
    data: XOR<InvoiceFileUpdateManyMutationInput, InvoiceFileUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceFiles to update
     */
    where?: InvoiceFileWhereInput
    /**
     * Limit how many InvoiceFiles to update.
     */
    limit?: number
  }

  /**
   * InvoiceFile updateManyAndReturn
   */
  export type InvoiceFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * The data used to update InvoiceFiles.
     */
    data: XOR<InvoiceFileUpdateManyMutationInput, InvoiceFileUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceFiles to update
     */
    where?: InvoiceFileWhereInput
    /**
     * Limit how many InvoiceFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceFile upsert
   */
  export type InvoiceFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * The filter to search for the InvoiceFile to update in case it exists.
     */
    where: InvoiceFileWhereUniqueInput
    /**
     * In case the InvoiceFile found by the `where` argument doesn't exist, create a new InvoiceFile with this data.
     */
    create: XOR<InvoiceFileCreateInput, InvoiceFileUncheckedCreateInput>
    /**
     * In case the InvoiceFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceFileUpdateInput, InvoiceFileUncheckedUpdateInput>
  }

  /**
   * InvoiceFile delete
   */
  export type InvoiceFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
    /**
     * Filter which InvoiceFile to delete.
     */
    where: InvoiceFileWhereUniqueInput
  }

  /**
   * InvoiceFile deleteMany
   */
  export type InvoiceFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceFiles to delete
     */
    where?: InvoiceFileWhereInput
    /**
     * Limit how many InvoiceFiles to delete.
     */
    limit?: number
  }

  /**
   * InvoiceFile without action
   */
  export type InvoiceFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceFile
     */
    select?: InvoiceFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceFile
     */
    omit?: InvoiceFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceFileInclude<ExtArgs> | null
  }


  /**
   * Model RecurringTransaction
   */

  export type AggregateRecurringTransaction = {
    _count: RecurringTransactionCountAggregateOutputType | null
    _avg: RecurringTransactionAvgAggregateOutputType | null
    _sum: RecurringTransactionSumAggregateOutputType | null
    _min: RecurringTransactionMinAggregateOutputType | null
    _max: RecurringTransactionMaxAggregateOutputType | null
  }

  export type RecurringTransactionAvgAggregateOutputType = {
    amount: Decimal | null
    dayOfMonth: number | null
    dayOfWeek: number | null
  }

  export type RecurringTransactionSumAggregateOutputType = {
    amount: Decimal | null
    dayOfMonth: number | null
    dayOfWeek: number | null
  }

  export type RecurringTransactionMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    amount: Decimal | null
    type: string | null
    category: string | null
    paymentMethod: string | null
    startDate: Date | null
    endDate: Date | null
    frequency: string | null
    dayOfMonth: number | null
    dayOfWeek: number | null
    isActive: boolean | null
    lastProcessed: Date | null
    contactId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecurringTransactionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    amount: Decimal | null
    type: string | null
    category: string | null
    paymentMethod: string | null
    startDate: Date | null
    endDate: Date | null
    frequency: string | null
    dayOfMonth: number | null
    dayOfWeek: number | null
    isActive: boolean | null
    lastProcessed: Date | null
    contactId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecurringTransactionCountAggregateOutputType = {
    id: number
    title: number
    description: number
    amount: number
    type: number
    category: number
    paymentMethod: number
    startDate: number
    endDate: number
    frequency: number
    dayOfMonth: number
    dayOfWeek: number
    isActive: number
    lastProcessed: number
    contactId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecurringTransactionAvgAggregateInputType = {
    amount?: true
    dayOfMonth?: true
    dayOfWeek?: true
  }

  export type RecurringTransactionSumAggregateInputType = {
    amount?: true
    dayOfMonth?: true
    dayOfWeek?: true
  }

  export type RecurringTransactionMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    type?: true
    category?: true
    paymentMethod?: true
    startDate?: true
    endDate?: true
    frequency?: true
    dayOfMonth?: true
    dayOfWeek?: true
    isActive?: true
    lastProcessed?: true
    contactId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecurringTransactionMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    type?: true
    category?: true
    paymentMethod?: true
    startDate?: true
    endDate?: true
    frequency?: true
    dayOfMonth?: true
    dayOfWeek?: true
    isActive?: true
    lastProcessed?: true
    contactId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecurringTransactionCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    type?: true
    category?: true
    paymentMethod?: true
    startDate?: true
    endDate?: true
    frequency?: true
    dayOfMonth?: true
    dayOfWeek?: true
    isActive?: true
    lastProcessed?: true
    contactId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecurringTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecurringTransaction to aggregate.
     */
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
     */
    orderBy?: RecurringTransactionOrderByWithRelationInput | RecurringTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecurringTransactions
    **/
    _count?: true | RecurringTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecurringTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecurringTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecurringTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecurringTransactionMaxAggregateInputType
  }

  export type GetRecurringTransactionAggregateType<T extends RecurringTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateRecurringTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecurringTransaction[P]>
      : GetScalarType<T[P], AggregateRecurringTransaction[P]>
  }




  export type RecurringTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurringTransactionWhereInput
    orderBy?: RecurringTransactionOrderByWithAggregationInput | RecurringTransactionOrderByWithAggregationInput[]
    by: RecurringTransactionScalarFieldEnum[] | RecurringTransactionScalarFieldEnum
    having?: RecurringTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecurringTransactionCountAggregateInputType | true
    _avg?: RecurringTransactionAvgAggregateInputType
    _sum?: RecurringTransactionSumAggregateInputType
    _min?: RecurringTransactionMinAggregateInputType
    _max?: RecurringTransactionMaxAggregateInputType
  }

  export type RecurringTransactionGroupByOutputType = {
    id: string
    title: string
    description: string | null
    amount: Decimal
    type: string
    category: string
    paymentMethod: string | null
    startDate: Date
    endDate: Date | null
    frequency: string
    dayOfMonth: number | null
    dayOfWeek: number | null
    isActive: boolean
    lastProcessed: Date | null
    contactId: string | null
    createdAt: Date
    updatedAt: Date
    _count: RecurringTransactionCountAggregateOutputType | null
    _avg: RecurringTransactionAvgAggregateOutputType | null
    _sum: RecurringTransactionSumAggregateOutputType | null
    _min: RecurringTransactionMinAggregateOutputType | null
    _max: RecurringTransactionMaxAggregateOutputType | null
  }

  type GetRecurringTransactionGroupByPayload<T extends RecurringTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecurringTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecurringTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecurringTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], RecurringTransactionGroupByOutputType[P]>
        }
      >
    >


  export type RecurringTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    type?: boolean
    category?: boolean
    paymentMethod?: boolean
    startDate?: boolean
    endDate?: boolean
    frequency?: boolean
    dayOfMonth?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    lastProcessed?: boolean
    contactId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Contact?: boolean | RecurringTransaction$ContactArgs<ExtArgs>
  }, ExtArgs["result"]["recurringTransaction"]>

  export type RecurringTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    type?: boolean
    category?: boolean
    paymentMethod?: boolean
    startDate?: boolean
    endDate?: boolean
    frequency?: boolean
    dayOfMonth?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    lastProcessed?: boolean
    contactId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Contact?: boolean | RecurringTransaction$ContactArgs<ExtArgs>
  }, ExtArgs["result"]["recurringTransaction"]>

  export type RecurringTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    type?: boolean
    category?: boolean
    paymentMethod?: boolean
    startDate?: boolean
    endDate?: boolean
    frequency?: boolean
    dayOfMonth?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    lastProcessed?: boolean
    contactId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Contact?: boolean | RecurringTransaction$ContactArgs<ExtArgs>
  }, ExtArgs["result"]["recurringTransaction"]>

  export type RecurringTransactionSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    type?: boolean
    category?: boolean
    paymentMethod?: boolean
    startDate?: boolean
    endDate?: boolean
    frequency?: boolean
    dayOfMonth?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    lastProcessed?: boolean
    contactId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecurringTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "amount" | "type" | "category" | "paymentMethod" | "startDate" | "endDate" | "frequency" | "dayOfMonth" | "dayOfWeek" | "isActive" | "lastProcessed" | "contactId" | "createdAt" | "updatedAt", ExtArgs["result"]["recurringTransaction"]>
  export type RecurringTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | RecurringTransaction$ContactArgs<ExtArgs>
  }
  export type RecurringTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | RecurringTransaction$ContactArgs<ExtArgs>
  }
  export type RecurringTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | RecurringTransaction$ContactArgs<ExtArgs>
  }

  export type $RecurringTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecurringTransaction"
    objects: {
      Contact: Prisma.$ContactPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      amount: Prisma.Decimal
      type: string
      category: string
      paymentMethod: string | null
      startDate: Date
      endDate: Date | null
      frequency: string
      dayOfMonth: number | null
      dayOfWeek: number | null
      isActive: boolean
      lastProcessed: Date | null
      contactId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recurringTransaction"]>
    composites: {}
  }

  type RecurringTransactionGetPayload<S extends boolean | null | undefined | RecurringTransactionDefaultArgs> = $Result.GetResult<Prisma.$RecurringTransactionPayload, S>

  type RecurringTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecurringTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecurringTransactionCountAggregateInputType | true
    }

  export interface RecurringTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecurringTransaction'], meta: { name: 'RecurringTransaction' } }
    /**
     * Find zero or one RecurringTransaction that matches the filter.
     * @param {RecurringTransactionFindUniqueArgs} args - Arguments to find a RecurringTransaction
     * @example
     * // Get one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecurringTransactionFindUniqueArgs>(args: SelectSubset<T, RecurringTransactionFindUniqueArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecurringTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecurringTransactionFindUniqueOrThrowArgs} args - Arguments to find a RecurringTransaction
     * @example
     * // Get one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecurringTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, RecurringTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecurringTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionFindFirstArgs} args - Arguments to find a RecurringTransaction
     * @example
     * // Get one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecurringTransactionFindFirstArgs>(args?: SelectSubset<T, RecurringTransactionFindFirstArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecurringTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionFindFirstOrThrowArgs} args - Arguments to find a RecurringTransaction
     * @example
     * // Get one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecurringTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, RecurringTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecurringTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecurringTransactions
     * const recurringTransactions = await prisma.recurringTransaction.findMany()
     * 
     * // Get first 10 RecurringTransactions
     * const recurringTransactions = await prisma.recurringTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recurringTransactionWithIdOnly = await prisma.recurringTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecurringTransactionFindManyArgs>(args?: SelectSubset<T, RecurringTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecurringTransaction.
     * @param {RecurringTransactionCreateArgs} args - Arguments to create a RecurringTransaction.
     * @example
     * // Create one RecurringTransaction
     * const RecurringTransaction = await prisma.recurringTransaction.create({
     *   data: {
     *     // ... data to create a RecurringTransaction
     *   }
     * })
     * 
     */
    create<T extends RecurringTransactionCreateArgs>(args: SelectSubset<T, RecurringTransactionCreateArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecurringTransactions.
     * @param {RecurringTransactionCreateManyArgs} args - Arguments to create many RecurringTransactions.
     * @example
     * // Create many RecurringTransactions
     * const recurringTransaction = await prisma.recurringTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecurringTransactionCreateManyArgs>(args?: SelectSubset<T, RecurringTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecurringTransactions and returns the data saved in the database.
     * @param {RecurringTransactionCreateManyAndReturnArgs} args - Arguments to create many RecurringTransactions.
     * @example
     * // Create many RecurringTransactions
     * const recurringTransaction = await prisma.recurringTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecurringTransactions and only return the `id`
     * const recurringTransactionWithIdOnly = await prisma.recurringTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecurringTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, RecurringTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecurringTransaction.
     * @param {RecurringTransactionDeleteArgs} args - Arguments to delete one RecurringTransaction.
     * @example
     * // Delete one RecurringTransaction
     * const RecurringTransaction = await prisma.recurringTransaction.delete({
     *   where: {
     *     // ... filter to delete one RecurringTransaction
     *   }
     * })
     * 
     */
    delete<T extends RecurringTransactionDeleteArgs>(args: SelectSubset<T, RecurringTransactionDeleteArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecurringTransaction.
     * @param {RecurringTransactionUpdateArgs} args - Arguments to update one RecurringTransaction.
     * @example
     * // Update one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecurringTransactionUpdateArgs>(args: SelectSubset<T, RecurringTransactionUpdateArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecurringTransactions.
     * @param {RecurringTransactionDeleteManyArgs} args - Arguments to filter RecurringTransactions to delete.
     * @example
     * // Delete a few RecurringTransactions
     * const { count } = await prisma.recurringTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecurringTransactionDeleteManyArgs>(args?: SelectSubset<T, RecurringTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecurringTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecurringTransactions
     * const recurringTransaction = await prisma.recurringTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecurringTransactionUpdateManyArgs>(args: SelectSubset<T, RecurringTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecurringTransactions and returns the data updated in the database.
     * @param {RecurringTransactionUpdateManyAndReturnArgs} args - Arguments to update many RecurringTransactions.
     * @example
     * // Update many RecurringTransactions
     * const recurringTransaction = await prisma.recurringTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecurringTransactions and only return the `id`
     * const recurringTransactionWithIdOnly = await prisma.recurringTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecurringTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, RecurringTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecurringTransaction.
     * @param {RecurringTransactionUpsertArgs} args - Arguments to update or create a RecurringTransaction.
     * @example
     * // Update or create a RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.upsert({
     *   create: {
     *     // ... data to create a RecurringTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecurringTransaction we want to update
     *   }
     * })
     */
    upsert<T extends RecurringTransactionUpsertArgs>(args: SelectSubset<T, RecurringTransactionUpsertArgs<ExtArgs>>): Prisma__RecurringTransactionClient<$Result.GetResult<Prisma.$RecurringTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecurringTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionCountArgs} args - Arguments to filter RecurringTransactions to count.
     * @example
     * // Count the number of RecurringTransactions
     * const count = await prisma.recurringTransaction.count({
     *   where: {
     *     // ... the filter for the RecurringTransactions we want to count
     *   }
     * })
    **/
    count<T extends RecurringTransactionCountArgs>(
      args?: Subset<T, RecurringTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecurringTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecurringTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecurringTransactionAggregateArgs>(args: Subset<T, RecurringTransactionAggregateArgs>): Prisma.PrismaPromise<GetRecurringTransactionAggregateType<T>>

    /**
     * Group by RecurringTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecurringTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecurringTransactionGroupByArgs['orderBy'] }
        : { orderBy?: RecurringTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecurringTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecurringTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecurringTransaction model
   */
  readonly fields: RecurringTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecurringTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecurringTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Contact<T extends RecurringTransaction$ContactArgs<ExtArgs> = {}>(args?: Subset<T, RecurringTransaction$ContactArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecurringTransaction model
   */
  interface RecurringTransactionFieldRefs {
    readonly id: FieldRef<"RecurringTransaction", 'String'>
    readonly title: FieldRef<"RecurringTransaction", 'String'>
    readonly description: FieldRef<"RecurringTransaction", 'String'>
    readonly amount: FieldRef<"RecurringTransaction", 'Decimal'>
    readonly type: FieldRef<"RecurringTransaction", 'String'>
    readonly category: FieldRef<"RecurringTransaction", 'String'>
    readonly paymentMethod: FieldRef<"RecurringTransaction", 'String'>
    readonly startDate: FieldRef<"RecurringTransaction", 'DateTime'>
    readonly endDate: FieldRef<"RecurringTransaction", 'DateTime'>
    readonly frequency: FieldRef<"RecurringTransaction", 'String'>
    readonly dayOfMonth: FieldRef<"RecurringTransaction", 'Int'>
    readonly dayOfWeek: FieldRef<"RecurringTransaction", 'Int'>
    readonly isActive: FieldRef<"RecurringTransaction", 'Boolean'>
    readonly lastProcessed: FieldRef<"RecurringTransaction", 'DateTime'>
    readonly contactId: FieldRef<"RecurringTransaction", 'String'>
    readonly createdAt: FieldRef<"RecurringTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"RecurringTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecurringTransaction findUnique
   */
  export type RecurringTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * Filter, which RecurringTransaction to fetch.
     */
    where: RecurringTransactionWhereUniqueInput
  }

  /**
   * RecurringTransaction findUniqueOrThrow
   */
  export type RecurringTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * Filter, which RecurringTransaction to fetch.
     */
    where: RecurringTransactionWhereUniqueInput
  }

  /**
   * RecurringTransaction findFirst
   */
  export type RecurringTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * Filter, which RecurringTransaction to fetch.
     */
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
     */
    orderBy?: RecurringTransactionOrderByWithRelationInput | RecurringTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecurringTransactions.
     */
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecurringTransactions.
     */
    distinct?: RecurringTransactionScalarFieldEnum | RecurringTransactionScalarFieldEnum[]
  }

  /**
   * RecurringTransaction findFirstOrThrow
   */
  export type RecurringTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * Filter, which RecurringTransaction to fetch.
     */
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
     */
    orderBy?: RecurringTransactionOrderByWithRelationInput | RecurringTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecurringTransactions.
     */
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecurringTransactions.
     */
    distinct?: RecurringTransactionScalarFieldEnum | RecurringTransactionScalarFieldEnum[]
  }

  /**
   * RecurringTransaction findMany
   */
  export type RecurringTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * Filter, which RecurringTransactions to fetch.
     */
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
     */
    orderBy?: RecurringTransactionOrderByWithRelationInput | RecurringTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecurringTransactions.
     */
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
     */
    skip?: number
    distinct?: RecurringTransactionScalarFieldEnum | RecurringTransactionScalarFieldEnum[]
  }

  /**
   * RecurringTransaction create
   */
  export type RecurringTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a RecurringTransaction.
     */
    data: XOR<RecurringTransactionCreateInput, RecurringTransactionUncheckedCreateInput>
  }

  /**
   * RecurringTransaction createMany
   */
  export type RecurringTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecurringTransactions.
     */
    data: RecurringTransactionCreateManyInput | RecurringTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecurringTransaction createManyAndReturn
   */
  export type RecurringTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many RecurringTransactions.
     */
    data: RecurringTransactionCreateManyInput | RecurringTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecurringTransaction update
   */
  export type RecurringTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a RecurringTransaction.
     */
    data: XOR<RecurringTransactionUpdateInput, RecurringTransactionUncheckedUpdateInput>
    /**
     * Choose, which RecurringTransaction to update.
     */
    where: RecurringTransactionWhereUniqueInput
  }

  /**
   * RecurringTransaction updateMany
   */
  export type RecurringTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecurringTransactions.
     */
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyInput>
    /**
     * Filter which RecurringTransactions to update
     */
    where?: RecurringTransactionWhereInput
    /**
     * Limit how many RecurringTransactions to update.
     */
    limit?: number
  }

  /**
   * RecurringTransaction updateManyAndReturn
   */
  export type RecurringTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * The data used to update RecurringTransactions.
     */
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyInput>
    /**
     * Filter which RecurringTransactions to update
     */
    where?: RecurringTransactionWhereInput
    /**
     * Limit how many RecurringTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecurringTransaction upsert
   */
  export type RecurringTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the RecurringTransaction to update in case it exists.
     */
    where: RecurringTransactionWhereUniqueInput
    /**
     * In case the RecurringTransaction found by the `where` argument doesn't exist, create a new RecurringTransaction with this data.
     */
    create: XOR<RecurringTransactionCreateInput, RecurringTransactionUncheckedCreateInput>
    /**
     * In case the RecurringTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecurringTransactionUpdateInput, RecurringTransactionUncheckedUpdateInput>
  }

  /**
   * RecurringTransaction delete
   */
  export type RecurringTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
    /**
     * Filter which RecurringTransaction to delete.
     */
    where: RecurringTransactionWhereUniqueInput
  }

  /**
   * RecurringTransaction deleteMany
   */
  export type RecurringTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecurringTransactions to delete
     */
    where?: RecurringTransactionWhereInput
    /**
     * Limit how many RecurringTransactions to delete.
     */
    limit?: number
  }

  /**
   * RecurringTransaction.Contact
   */
  export type RecurringTransaction$ContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
  }

  /**
   * RecurringTransaction without action
   */
  export type RecurringTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
     */
    select?: RecurringTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecurringTransaction
     */
    omit?: RecurringTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurringTransactionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    passwordHash: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      passwordHash: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    salary: Decimal | null
  }

  export type EmployeeSumAggregateOutputType = {
    salary: Decimal | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    name: string | null
    position: string | null
    department: string | null
    startDate: Date | null
    email: string | null
    phone: string | null
    address: string | null
    taxId: string | null
    socialSecurityNumber: string | null
    bankAccount: string | null
    salary: Decimal | null
    status: $Enums.EmployeeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    position: string | null
    department: string | null
    startDate: Date | null
    email: string | null
    phone: string | null
    address: string | null
    taxId: string | null
    socialSecurityNumber: string | null
    bankAccount: string | null
    salary: Decimal | null
    status: $Enums.EmployeeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    name: number
    position: number
    department: number
    startDate: number
    email: number
    phone: number
    address: number
    taxId: number
    socialSecurityNumber: number
    bankAccount: number
    salary: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    salary?: true
  }

  export type EmployeeSumAggregateInputType = {
    salary?: true
  }

  export type EmployeeMinAggregateInputType = {
    id?: true
    name?: true
    position?: true
    department?: true
    startDate?: true
    email?: true
    phone?: true
    address?: true
    taxId?: true
    socialSecurityNumber?: true
    bankAccount?: true
    salary?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    name?: true
    position?: true
    department?: true
    startDate?: true
    email?: true
    phone?: true
    address?: true
    taxId?: true
    socialSecurityNumber?: true
    bankAccount?: true
    salary?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    name?: true
    position?: true
    department?: true
    startDate?: true
    email?: true
    phone?: true
    address?: true
    taxId?: true
    socialSecurityNumber?: true
    bankAccount?: true
    salary?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    name: string
    position: string
    department: string
    startDate: Date
    email: string | null
    phone: string | null
    address: string | null
    taxId: string | null
    socialSecurityNumber: string | null
    bankAccount: string | null
    salary: Decimal
    status: $Enums.EmployeeStatus
    createdAt: Date
    updatedAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    position?: boolean
    department?: boolean
    startDate?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    taxId?: boolean
    socialSecurityNumber?: boolean
    bankAccount?: boolean
    salary?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    salaryPayments?: boolean | Employee$salaryPaymentsArgs<ExtArgs>
    leaveRequests?: boolean | Employee$leaveRequestsArgs<ExtArgs>
    documents?: boolean | Employee$documentsArgs<ExtArgs>
    leaveBalance?: boolean | Employee$leaveBalanceArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    position?: boolean
    department?: boolean
    startDate?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    taxId?: boolean
    socialSecurityNumber?: boolean
    bankAccount?: boolean
    salary?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    position?: boolean
    department?: boolean
    startDate?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    taxId?: boolean
    socialSecurityNumber?: boolean
    bankAccount?: boolean
    salary?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    name?: boolean
    position?: boolean
    department?: boolean
    startDate?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    taxId?: boolean
    socialSecurityNumber?: boolean
    bankAccount?: boolean
    salary?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "position" | "department" | "startDate" | "email" | "phone" | "address" | "taxId" | "socialSecurityNumber" | "bankAccount" | "salary" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    salaryPayments?: boolean | Employee$salaryPaymentsArgs<ExtArgs>
    leaveRequests?: boolean | Employee$leaveRequestsArgs<ExtArgs>
    documents?: boolean | Employee$documentsArgs<ExtArgs>
    leaveBalance?: boolean | Employee$leaveBalanceArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      salaryPayments: Prisma.$SalaryPaymentPayload<ExtArgs>[]
      leaveRequests: Prisma.$LeaveRequestPayload<ExtArgs>[]
      documents: Prisma.$EmployeeDocumentPayload<ExtArgs>[]
      leaveBalance: Prisma.$EmployeeLeaveBalancePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      position: string
      department: string
      startDate: Date
      email: string | null
      phone: string | null
      address: string | null
      taxId: string | null
      socialSecurityNumber: string | null
      bankAccount: string | null
      salary: Prisma.Decimal
      status: $Enums.EmployeeStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    salaryPayments<T extends Employee$salaryPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$salaryPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leaveRequests<T extends Employee$leaveRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$leaveRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Employee$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leaveBalance<T extends Employee$leaveBalanceArgs<ExtArgs> = {}>(args?: Subset<T, Employee$leaveBalanceArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly name: FieldRef<"Employee", 'String'>
    readonly position: FieldRef<"Employee", 'String'>
    readonly department: FieldRef<"Employee", 'String'>
    readonly startDate: FieldRef<"Employee", 'DateTime'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly phone: FieldRef<"Employee", 'String'>
    readonly address: FieldRef<"Employee", 'String'>
    readonly taxId: FieldRef<"Employee", 'String'>
    readonly socialSecurityNumber: FieldRef<"Employee", 'String'>
    readonly bankAccount: FieldRef<"Employee", 'String'>
    readonly salary: FieldRef<"Employee", 'Decimal'>
    readonly status: FieldRef<"Employee", 'EmployeeStatus'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.salaryPayments
   */
  export type Employee$salaryPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    where?: SalaryPaymentWhereInput
    orderBy?: SalaryPaymentOrderByWithRelationInput | SalaryPaymentOrderByWithRelationInput[]
    cursor?: SalaryPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalaryPaymentScalarFieldEnum | SalaryPaymentScalarFieldEnum[]
  }

  /**
   * Employee.leaveRequests
   */
  export type Employee$leaveRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    where?: LeaveRequestWhereInput
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    cursor?: LeaveRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * Employee.documents
   */
  export type Employee$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    where?: EmployeeDocumentWhereInput
    orderBy?: EmployeeDocumentOrderByWithRelationInput | EmployeeDocumentOrderByWithRelationInput[]
    cursor?: EmployeeDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeDocumentScalarFieldEnum | EmployeeDocumentScalarFieldEnum[]
  }

  /**
   * Employee.leaveBalance
   */
  export type Employee$leaveBalanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    where?: EmployeeLeaveBalanceWhereInput
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model SalaryPayment
   */

  export type AggregateSalaryPayment = {
    _count: SalaryPaymentCountAggregateOutputType | null
    _avg: SalaryPaymentAvgAggregateOutputType | null
    _sum: SalaryPaymentSumAggregateOutputType | null
    _min: SalaryPaymentMinAggregateOutputType | null
    _max: SalaryPaymentMaxAggregateOutputType | null
  }

  export type SalaryPaymentAvgAggregateOutputType = {
    amount: Decimal | null
    taxAmount: Decimal | null
    netAmount: Decimal | null
  }

  export type SalaryPaymentSumAggregateOutputType = {
    amount: Decimal | null
    taxAmount: Decimal | null
    netAmount: Decimal | null
  }

  export type SalaryPaymentMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    paymentDate: Date | null
    amount: Decimal | null
    type: $Enums.SalaryPaymentType | null
    taxAmount: Decimal | null
    netAmount: Decimal | null
    notes: string | null
    paymentMethod: string | null
    status: $Enums.PaymentStatus | null
    bonusTypeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SalaryPaymentMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    paymentDate: Date | null
    amount: Decimal | null
    type: $Enums.SalaryPaymentType | null
    taxAmount: Decimal | null
    netAmount: Decimal | null
    notes: string | null
    paymentMethod: string | null
    status: $Enums.PaymentStatus | null
    bonusTypeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SalaryPaymentCountAggregateOutputType = {
    id: number
    employeeId: number
    paymentDate: number
    amount: number
    type: number
    taxAmount: number
    netAmount: number
    notes: number
    paymentMethod: number
    status: number
    bonusTypeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SalaryPaymentAvgAggregateInputType = {
    amount?: true
    taxAmount?: true
    netAmount?: true
  }

  export type SalaryPaymentSumAggregateInputType = {
    amount?: true
    taxAmount?: true
    netAmount?: true
  }

  export type SalaryPaymentMinAggregateInputType = {
    id?: true
    employeeId?: true
    paymentDate?: true
    amount?: true
    type?: true
    taxAmount?: true
    netAmount?: true
    notes?: true
    paymentMethod?: true
    status?: true
    bonusTypeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SalaryPaymentMaxAggregateInputType = {
    id?: true
    employeeId?: true
    paymentDate?: true
    amount?: true
    type?: true
    taxAmount?: true
    netAmount?: true
    notes?: true
    paymentMethod?: true
    status?: true
    bonusTypeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SalaryPaymentCountAggregateInputType = {
    id?: true
    employeeId?: true
    paymentDate?: true
    amount?: true
    type?: true
    taxAmount?: true
    netAmount?: true
    notes?: true
    paymentMethod?: true
    status?: true
    bonusTypeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SalaryPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalaryPayment to aggregate.
     */
    where?: SalaryPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalaryPayments to fetch.
     */
    orderBy?: SalaryPaymentOrderByWithRelationInput | SalaryPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SalaryPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalaryPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalaryPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SalaryPayments
    **/
    _count?: true | SalaryPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SalaryPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SalaryPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalaryPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalaryPaymentMaxAggregateInputType
  }

  export type GetSalaryPaymentAggregateType<T extends SalaryPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateSalaryPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSalaryPayment[P]>
      : GetScalarType<T[P], AggregateSalaryPayment[P]>
  }




  export type SalaryPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalaryPaymentWhereInput
    orderBy?: SalaryPaymentOrderByWithAggregationInput | SalaryPaymentOrderByWithAggregationInput[]
    by: SalaryPaymentScalarFieldEnum[] | SalaryPaymentScalarFieldEnum
    having?: SalaryPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalaryPaymentCountAggregateInputType | true
    _avg?: SalaryPaymentAvgAggregateInputType
    _sum?: SalaryPaymentSumAggregateInputType
    _min?: SalaryPaymentMinAggregateInputType
    _max?: SalaryPaymentMaxAggregateInputType
  }

  export type SalaryPaymentGroupByOutputType = {
    id: string
    employeeId: string
    paymentDate: Date
    amount: Decimal
    type: $Enums.SalaryPaymentType
    taxAmount: Decimal
    netAmount: Decimal
    notes: string | null
    paymentMethod: string | null
    status: $Enums.PaymentStatus
    bonusTypeId: string | null
    createdAt: Date
    updatedAt: Date
    _count: SalaryPaymentCountAggregateOutputType | null
    _avg: SalaryPaymentAvgAggregateOutputType | null
    _sum: SalaryPaymentSumAggregateOutputType | null
    _min: SalaryPaymentMinAggregateOutputType | null
    _max: SalaryPaymentMaxAggregateOutputType | null
  }

  type GetSalaryPaymentGroupByPayload<T extends SalaryPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SalaryPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalaryPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalaryPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], SalaryPaymentGroupByOutputType[P]>
        }
      >
    >


  export type SalaryPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    paymentDate?: boolean
    amount?: boolean
    type?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    notes?: boolean
    paymentMethod?: boolean
    status?: boolean
    bonusTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bonusType?: boolean | SalaryPayment$bonusTypeArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salaryPayment"]>

  export type SalaryPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    paymentDate?: boolean
    amount?: boolean
    type?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    notes?: boolean
    paymentMethod?: boolean
    status?: boolean
    bonusTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bonusType?: boolean | SalaryPayment$bonusTypeArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salaryPayment"]>

  export type SalaryPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    paymentDate?: boolean
    amount?: boolean
    type?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    notes?: boolean
    paymentMethod?: boolean
    status?: boolean
    bonusTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bonusType?: boolean | SalaryPayment$bonusTypeArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salaryPayment"]>

  export type SalaryPaymentSelectScalar = {
    id?: boolean
    employeeId?: boolean
    paymentDate?: boolean
    amount?: boolean
    type?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    notes?: boolean
    paymentMethod?: boolean
    status?: boolean
    bonusTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SalaryPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "paymentDate" | "amount" | "type" | "taxAmount" | "netAmount" | "notes" | "paymentMethod" | "status" | "bonusTypeId" | "createdAt" | "updatedAt", ExtArgs["result"]["salaryPayment"]>
  export type SalaryPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bonusType?: boolean | SalaryPayment$bonusTypeArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type SalaryPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bonusType?: boolean | SalaryPayment$bonusTypeArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type SalaryPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bonusType?: boolean | SalaryPayment$bonusTypeArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $SalaryPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SalaryPayment"
    objects: {
      bonusType: Prisma.$BonusTypePayload<ExtArgs> | null
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      paymentDate: Date
      amount: Prisma.Decimal
      type: $Enums.SalaryPaymentType
      taxAmount: Prisma.Decimal
      netAmount: Prisma.Decimal
      notes: string | null
      paymentMethod: string | null
      status: $Enums.PaymentStatus
      bonusTypeId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["salaryPayment"]>
    composites: {}
  }

  type SalaryPaymentGetPayload<S extends boolean | null | undefined | SalaryPaymentDefaultArgs> = $Result.GetResult<Prisma.$SalaryPaymentPayload, S>

  type SalaryPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SalaryPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SalaryPaymentCountAggregateInputType | true
    }

  export interface SalaryPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SalaryPayment'], meta: { name: 'SalaryPayment' } }
    /**
     * Find zero or one SalaryPayment that matches the filter.
     * @param {SalaryPaymentFindUniqueArgs} args - Arguments to find a SalaryPayment
     * @example
     * // Get one SalaryPayment
     * const salaryPayment = await prisma.salaryPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SalaryPaymentFindUniqueArgs>(args: SelectSubset<T, SalaryPaymentFindUniqueArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SalaryPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SalaryPaymentFindUniqueOrThrowArgs} args - Arguments to find a SalaryPayment
     * @example
     * // Get one SalaryPayment
     * const salaryPayment = await prisma.salaryPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SalaryPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, SalaryPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SalaryPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentFindFirstArgs} args - Arguments to find a SalaryPayment
     * @example
     * // Get one SalaryPayment
     * const salaryPayment = await prisma.salaryPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SalaryPaymentFindFirstArgs>(args?: SelectSubset<T, SalaryPaymentFindFirstArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SalaryPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentFindFirstOrThrowArgs} args - Arguments to find a SalaryPayment
     * @example
     * // Get one SalaryPayment
     * const salaryPayment = await prisma.salaryPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SalaryPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, SalaryPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SalaryPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SalaryPayments
     * const salaryPayments = await prisma.salaryPayment.findMany()
     * 
     * // Get first 10 SalaryPayments
     * const salaryPayments = await prisma.salaryPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salaryPaymentWithIdOnly = await prisma.salaryPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SalaryPaymentFindManyArgs>(args?: SelectSubset<T, SalaryPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SalaryPayment.
     * @param {SalaryPaymentCreateArgs} args - Arguments to create a SalaryPayment.
     * @example
     * // Create one SalaryPayment
     * const SalaryPayment = await prisma.salaryPayment.create({
     *   data: {
     *     // ... data to create a SalaryPayment
     *   }
     * })
     * 
     */
    create<T extends SalaryPaymentCreateArgs>(args: SelectSubset<T, SalaryPaymentCreateArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SalaryPayments.
     * @param {SalaryPaymentCreateManyArgs} args - Arguments to create many SalaryPayments.
     * @example
     * // Create many SalaryPayments
     * const salaryPayment = await prisma.salaryPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SalaryPaymentCreateManyArgs>(args?: SelectSubset<T, SalaryPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SalaryPayments and returns the data saved in the database.
     * @param {SalaryPaymentCreateManyAndReturnArgs} args - Arguments to create many SalaryPayments.
     * @example
     * // Create many SalaryPayments
     * const salaryPayment = await prisma.salaryPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SalaryPayments and only return the `id`
     * const salaryPaymentWithIdOnly = await prisma.salaryPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SalaryPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, SalaryPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SalaryPayment.
     * @param {SalaryPaymentDeleteArgs} args - Arguments to delete one SalaryPayment.
     * @example
     * // Delete one SalaryPayment
     * const SalaryPayment = await prisma.salaryPayment.delete({
     *   where: {
     *     // ... filter to delete one SalaryPayment
     *   }
     * })
     * 
     */
    delete<T extends SalaryPaymentDeleteArgs>(args: SelectSubset<T, SalaryPaymentDeleteArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SalaryPayment.
     * @param {SalaryPaymentUpdateArgs} args - Arguments to update one SalaryPayment.
     * @example
     * // Update one SalaryPayment
     * const salaryPayment = await prisma.salaryPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SalaryPaymentUpdateArgs>(args: SelectSubset<T, SalaryPaymentUpdateArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SalaryPayments.
     * @param {SalaryPaymentDeleteManyArgs} args - Arguments to filter SalaryPayments to delete.
     * @example
     * // Delete a few SalaryPayments
     * const { count } = await prisma.salaryPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SalaryPaymentDeleteManyArgs>(args?: SelectSubset<T, SalaryPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SalaryPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SalaryPayments
     * const salaryPayment = await prisma.salaryPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SalaryPaymentUpdateManyArgs>(args: SelectSubset<T, SalaryPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SalaryPayments and returns the data updated in the database.
     * @param {SalaryPaymentUpdateManyAndReturnArgs} args - Arguments to update many SalaryPayments.
     * @example
     * // Update many SalaryPayments
     * const salaryPayment = await prisma.salaryPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SalaryPayments and only return the `id`
     * const salaryPaymentWithIdOnly = await prisma.salaryPayment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SalaryPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, SalaryPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SalaryPayment.
     * @param {SalaryPaymentUpsertArgs} args - Arguments to update or create a SalaryPayment.
     * @example
     * // Update or create a SalaryPayment
     * const salaryPayment = await prisma.salaryPayment.upsert({
     *   create: {
     *     // ... data to create a SalaryPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SalaryPayment we want to update
     *   }
     * })
     */
    upsert<T extends SalaryPaymentUpsertArgs>(args: SelectSubset<T, SalaryPaymentUpsertArgs<ExtArgs>>): Prisma__SalaryPaymentClient<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SalaryPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentCountArgs} args - Arguments to filter SalaryPayments to count.
     * @example
     * // Count the number of SalaryPayments
     * const count = await prisma.salaryPayment.count({
     *   where: {
     *     // ... the filter for the SalaryPayments we want to count
     *   }
     * })
    **/
    count<T extends SalaryPaymentCountArgs>(
      args?: Subset<T, SalaryPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalaryPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SalaryPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SalaryPaymentAggregateArgs>(args: Subset<T, SalaryPaymentAggregateArgs>): Prisma.PrismaPromise<GetSalaryPaymentAggregateType<T>>

    /**
     * Group by SalaryPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaryPaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SalaryPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalaryPaymentGroupByArgs['orderBy'] }
        : { orderBy?: SalaryPaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SalaryPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalaryPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SalaryPayment model
   */
  readonly fields: SalaryPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SalaryPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SalaryPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bonusType<T extends SalaryPayment$bonusTypeArgs<ExtArgs> = {}>(args?: Subset<T, SalaryPayment$bonusTypeArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SalaryPayment model
   */
  interface SalaryPaymentFieldRefs {
    readonly id: FieldRef<"SalaryPayment", 'String'>
    readonly employeeId: FieldRef<"SalaryPayment", 'String'>
    readonly paymentDate: FieldRef<"SalaryPayment", 'DateTime'>
    readonly amount: FieldRef<"SalaryPayment", 'Decimal'>
    readonly type: FieldRef<"SalaryPayment", 'SalaryPaymentType'>
    readonly taxAmount: FieldRef<"SalaryPayment", 'Decimal'>
    readonly netAmount: FieldRef<"SalaryPayment", 'Decimal'>
    readonly notes: FieldRef<"SalaryPayment", 'String'>
    readonly paymentMethod: FieldRef<"SalaryPayment", 'String'>
    readonly status: FieldRef<"SalaryPayment", 'PaymentStatus'>
    readonly bonusTypeId: FieldRef<"SalaryPayment", 'String'>
    readonly createdAt: FieldRef<"SalaryPayment", 'DateTime'>
    readonly updatedAt: FieldRef<"SalaryPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SalaryPayment findUnique
   */
  export type SalaryPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SalaryPayment to fetch.
     */
    where: SalaryPaymentWhereUniqueInput
  }

  /**
   * SalaryPayment findUniqueOrThrow
   */
  export type SalaryPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SalaryPayment to fetch.
     */
    where: SalaryPaymentWhereUniqueInput
  }

  /**
   * SalaryPayment findFirst
   */
  export type SalaryPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SalaryPayment to fetch.
     */
    where?: SalaryPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalaryPayments to fetch.
     */
    orderBy?: SalaryPaymentOrderByWithRelationInput | SalaryPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalaryPayments.
     */
    cursor?: SalaryPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalaryPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalaryPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalaryPayments.
     */
    distinct?: SalaryPaymentScalarFieldEnum | SalaryPaymentScalarFieldEnum[]
  }

  /**
   * SalaryPayment findFirstOrThrow
   */
  export type SalaryPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SalaryPayment to fetch.
     */
    where?: SalaryPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalaryPayments to fetch.
     */
    orderBy?: SalaryPaymentOrderByWithRelationInput | SalaryPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalaryPayments.
     */
    cursor?: SalaryPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalaryPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalaryPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalaryPayments.
     */
    distinct?: SalaryPaymentScalarFieldEnum | SalaryPaymentScalarFieldEnum[]
  }

  /**
   * SalaryPayment findMany
   */
  export type SalaryPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SalaryPayments to fetch.
     */
    where?: SalaryPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalaryPayments to fetch.
     */
    orderBy?: SalaryPaymentOrderByWithRelationInput | SalaryPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SalaryPayments.
     */
    cursor?: SalaryPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalaryPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalaryPayments.
     */
    skip?: number
    distinct?: SalaryPaymentScalarFieldEnum | SalaryPaymentScalarFieldEnum[]
  }

  /**
   * SalaryPayment create
   */
  export type SalaryPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a SalaryPayment.
     */
    data: XOR<SalaryPaymentCreateInput, SalaryPaymentUncheckedCreateInput>
  }

  /**
   * SalaryPayment createMany
   */
  export type SalaryPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SalaryPayments.
     */
    data: SalaryPaymentCreateManyInput | SalaryPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SalaryPayment createManyAndReturn
   */
  export type SalaryPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many SalaryPayments.
     */
    data: SalaryPaymentCreateManyInput | SalaryPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SalaryPayment update
   */
  export type SalaryPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a SalaryPayment.
     */
    data: XOR<SalaryPaymentUpdateInput, SalaryPaymentUncheckedUpdateInput>
    /**
     * Choose, which SalaryPayment to update.
     */
    where: SalaryPaymentWhereUniqueInput
  }

  /**
   * SalaryPayment updateMany
   */
  export type SalaryPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SalaryPayments.
     */
    data: XOR<SalaryPaymentUpdateManyMutationInput, SalaryPaymentUncheckedUpdateManyInput>
    /**
     * Filter which SalaryPayments to update
     */
    where?: SalaryPaymentWhereInput
    /**
     * Limit how many SalaryPayments to update.
     */
    limit?: number
  }

  /**
   * SalaryPayment updateManyAndReturn
   */
  export type SalaryPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * The data used to update SalaryPayments.
     */
    data: XOR<SalaryPaymentUpdateManyMutationInput, SalaryPaymentUncheckedUpdateManyInput>
    /**
     * Filter which SalaryPayments to update
     */
    where?: SalaryPaymentWhereInput
    /**
     * Limit how many SalaryPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SalaryPayment upsert
   */
  export type SalaryPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the SalaryPayment to update in case it exists.
     */
    where: SalaryPaymentWhereUniqueInput
    /**
     * In case the SalaryPayment found by the `where` argument doesn't exist, create a new SalaryPayment with this data.
     */
    create: XOR<SalaryPaymentCreateInput, SalaryPaymentUncheckedCreateInput>
    /**
     * In case the SalaryPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SalaryPaymentUpdateInput, SalaryPaymentUncheckedUpdateInput>
  }

  /**
   * SalaryPayment delete
   */
  export type SalaryPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    /**
     * Filter which SalaryPayment to delete.
     */
    where: SalaryPaymentWhereUniqueInput
  }

  /**
   * SalaryPayment deleteMany
   */
  export type SalaryPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalaryPayments to delete
     */
    where?: SalaryPaymentWhereInput
    /**
     * Limit how many SalaryPayments to delete.
     */
    limit?: number
  }

  /**
   * SalaryPayment.bonusType
   */
  export type SalaryPayment$bonusTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    where?: BonusTypeWhereInput
  }

  /**
   * SalaryPayment without action
   */
  export type SalaryPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
  }


  /**
   * Model LeaveRequest
   */

  export type AggregateLeaveRequest = {
    _count: LeaveRequestCountAggregateOutputType | null
    _avg: LeaveRequestAvgAggregateOutputType | null
    _sum: LeaveRequestSumAggregateOutputType | null
    _min: LeaveRequestMinAggregateOutputType | null
    _max: LeaveRequestMaxAggregateOutputType | null
  }

  export type LeaveRequestAvgAggregateOutputType = {
    days: number | null
  }

  export type LeaveRequestSumAggregateOutputType = {
    days: number | null
  }

  export type LeaveRequestMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    startDate: Date | null
    endDate: Date | null
    days: number | null
    type: $Enums.LeaveType | null
    status: $Enums.LeaveStatus | null
    notes: string | null
    approvedAt: Date | null
    approvedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaveRequestMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    startDate: Date | null
    endDate: Date | null
    days: number | null
    type: $Enums.LeaveType | null
    status: $Enums.LeaveStatus | null
    notes: string | null
    approvedAt: Date | null
    approvedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaveRequestCountAggregateOutputType = {
    id: number
    employeeId: number
    startDate: number
    endDate: number
    days: number
    type: number
    status: number
    notes: number
    approvedAt: number
    approvedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeaveRequestAvgAggregateInputType = {
    days?: true
  }

  export type LeaveRequestSumAggregateInputType = {
    days?: true
  }

  export type LeaveRequestMinAggregateInputType = {
    id?: true
    employeeId?: true
    startDate?: true
    endDate?: true
    days?: true
    type?: true
    status?: true
    notes?: true
    approvedAt?: true
    approvedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaveRequestMaxAggregateInputType = {
    id?: true
    employeeId?: true
    startDate?: true
    endDate?: true
    days?: true
    type?: true
    status?: true
    notes?: true
    approvedAt?: true
    approvedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaveRequestCountAggregateInputType = {
    id?: true
    employeeId?: true
    startDate?: true
    endDate?: true
    days?: true
    type?: true
    status?: true
    notes?: true
    approvedAt?: true
    approvedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeaveRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveRequest to aggregate.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveRequests
    **/
    _count?: true | LeaveRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveRequestMaxAggregateInputType
  }

  export type GetLeaveRequestAggregateType<T extends LeaveRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveRequest[P]>
      : GetScalarType<T[P], AggregateLeaveRequest[P]>
  }




  export type LeaveRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveRequestWhereInput
    orderBy?: LeaveRequestOrderByWithAggregationInput | LeaveRequestOrderByWithAggregationInput[]
    by: LeaveRequestScalarFieldEnum[] | LeaveRequestScalarFieldEnum
    having?: LeaveRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveRequestCountAggregateInputType | true
    _avg?: LeaveRequestAvgAggregateInputType
    _sum?: LeaveRequestSumAggregateInputType
    _min?: LeaveRequestMinAggregateInputType
    _max?: LeaveRequestMaxAggregateInputType
  }

  export type LeaveRequestGroupByOutputType = {
    id: string
    employeeId: string
    startDate: Date
    endDate: Date
    days: number
    type: $Enums.LeaveType
    status: $Enums.LeaveStatus
    notes: string | null
    approvedAt: Date | null
    approvedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: LeaveRequestCountAggregateOutputType | null
    _avg: LeaveRequestAvgAggregateOutputType | null
    _sum: LeaveRequestSumAggregateOutputType | null
    _min: LeaveRequestMinAggregateOutputType | null
    _max: LeaveRequestMaxAggregateOutputType | null
  }

  type GetLeaveRequestGroupByPayload<T extends LeaveRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveRequestGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveRequestGroupByOutputType[P]>
        }
      >
    >


  export type LeaveRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    days?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    days?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    days?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectScalar = {
    id?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    days?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeaveRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "startDate" | "endDate" | "days" | "type" | "status" | "notes" | "approvedAt" | "approvedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["leaveRequest"]>
  export type LeaveRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type LeaveRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type LeaveRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $LeaveRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveRequest"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      startDate: Date
      endDate: Date
      days: number
      type: $Enums.LeaveType
      status: $Enums.LeaveStatus
      notes: string | null
      approvedAt: Date | null
      approvedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leaveRequest"]>
    composites: {}
  }

  type LeaveRequestGetPayload<S extends boolean | null | undefined | LeaveRequestDefaultArgs> = $Result.GetResult<Prisma.$LeaveRequestPayload, S>

  type LeaveRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveRequestCountAggregateInputType | true
    }

  export interface LeaveRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveRequest'], meta: { name: 'LeaveRequest' } }
    /**
     * Find zero or one LeaveRequest that matches the filter.
     * @param {LeaveRequestFindUniqueArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveRequestFindUniqueArgs>(args: SelectSubset<T, LeaveRequestFindUniqueArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveRequestFindUniqueOrThrowArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindFirstArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveRequestFindFirstArgs>(args?: SelectSubset<T, LeaveRequestFindFirstArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindFirstOrThrowArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveRequests
     * const leaveRequests = await prisma.leaveRequest.findMany()
     * 
     * // Get first 10 LeaveRequests
     * const leaveRequests = await prisma.leaveRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveRequestFindManyArgs>(args?: SelectSubset<T, LeaveRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveRequest.
     * @param {LeaveRequestCreateArgs} args - Arguments to create a LeaveRequest.
     * @example
     * // Create one LeaveRequest
     * const LeaveRequest = await prisma.leaveRequest.create({
     *   data: {
     *     // ... data to create a LeaveRequest
     *   }
     * })
     * 
     */
    create<T extends LeaveRequestCreateArgs>(args: SelectSubset<T, LeaveRequestCreateArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveRequests.
     * @param {LeaveRequestCreateManyArgs} args - Arguments to create many LeaveRequests.
     * @example
     * // Create many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveRequestCreateManyArgs>(args?: SelectSubset<T, LeaveRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveRequests and returns the data saved in the database.
     * @param {LeaveRequestCreateManyAndReturnArgs} args - Arguments to create many LeaveRequests.
     * @example
     * // Create many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveRequests and only return the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveRequest.
     * @param {LeaveRequestDeleteArgs} args - Arguments to delete one LeaveRequest.
     * @example
     * // Delete one LeaveRequest
     * const LeaveRequest = await prisma.leaveRequest.delete({
     *   where: {
     *     // ... filter to delete one LeaveRequest
     *   }
     * })
     * 
     */
    delete<T extends LeaveRequestDeleteArgs>(args: SelectSubset<T, LeaveRequestDeleteArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveRequest.
     * @param {LeaveRequestUpdateArgs} args - Arguments to update one LeaveRequest.
     * @example
     * // Update one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveRequestUpdateArgs>(args: SelectSubset<T, LeaveRequestUpdateArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveRequests.
     * @param {LeaveRequestDeleteManyArgs} args - Arguments to filter LeaveRequests to delete.
     * @example
     * // Delete a few LeaveRequests
     * const { count } = await prisma.leaveRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveRequestDeleteManyArgs>(args?: SelectSubset<T, LeaveRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveRequestUpdateManyArgs>(args: SelectSubset<T, LeaveRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveRequests and returns the data updated in the database.
     * @param {LeaveRequestUpdateManyAndReturnArgs} args - Arguments to update many LeaveRequests.
     * @example
     * // Update many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveRequests and only return the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeaveRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveRequest.
     * @param {LeaveRequestUpsertArgs} args - Arguments to update or create a LeaveRequest.
     * @example
     * // Update or create a LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.upsert({
     *   create: {
     *     // ... data to create a LeaveRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveRequest we want to update
     *   }
     * })
     */
    upsert<T extends LeaveRequestUpsertArgs>(args: SelectSubset<T, LeaveRequestUpsertArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestCountArgs} args - Arguments to filter LeaveRequests to count.
     * @example
     * // Count the number of LeaveRequests
     * const count = await prisma.leaveRequest.count({
     *   where: {
     *     // ... the filter for the LeaveRequests we want to count
     *   }
     * })
    **/
    count<T extends LeaveRequestCountArgs>(
      args?: Subset<T, LeaveRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaveRequestAggregateArgs>(args: Subset<T, LeaveRequestAggregateArgs>): Prisma.PrismaPromise<GetLeaveRequestAggregateType<T>>

    /**
     * Group by LeaveRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaveRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveRequestGroupByArgs['orderBy'] }
        : { orderBy?: LeaveRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaveRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveRequest model
   */
  readonly fields: LeaveRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaveRequest model
   */
  interface LeaveRequestFieldRefs {
    readonly id: FieldRef<"LeaveRequest", 'String'>
    readonly employeeId: FieldRef<"LeaveRequest", 'String'>
    readonly startDate: FieldRef<"LeaveRequest", 'DateTime'>
    readonly endDate: FieldRef<"LeaveRequest", 'DateTime'>
    readonly days: FieldRef<"LeaveRequest", 'Int'>
    readonly type: FieldRef<"LeaveRequest", 'LeaveType'>
    readonly status: FieldRef<"LeaveRequest", 'LeaveStatus'>
    readonly notes: FieldRef<"LeaveRequest", 'String'>
    readonly approvedAt: FieldRef<"LeaveRequest", 'DateTime'>
    readonly approvedBy: FieldRef<"LeaveRequest", 'String'>
    readonly createdAt: FieldRef<"LeaveRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"LeaveRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveRequest findUnique
   */
  export type LeaveRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest findUniqueOrThrow
   */
  export type LeaveRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest findFirst
   */
  export type LeaveRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveRequests.
     */
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest findFirstOrThrow
   */
  export type LeaveRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveRequests.
     */
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest findMany
   */
  export type LeaveRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequests to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest create
   */
  export type LeaveRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveRequest.
     */
    data: XOR<LeaveRequestCreateInput, LeaveRequestUncheckedCreateInput>
  }

  /**
   * LeaveRequest createMany
   */
  export type LeaveRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveRequests.
     */
    data: LeaveRequestCreateManyInput | LeaveRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveRequest createManyAndReturn
   */
  export type LeaveRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveRequests.
     */
    data: LeaveRequestCreateManyInput | LeaveRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveRequest update
   */
  export type LeaveRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveRequest.
     */
    data: XOR<LeaveRequestUpdateInput, LeaveRequestUncheckedUpdateInput>
    /**
     * Choose, which LeaveRequest to update.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest updateMany
   */
  export type LeaveRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveRequests.
     */
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyInput>
    /**
     * Filter which LeaveRequests to update
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to update.
     */
    limit?: number
  }

  /**
   * LeaveRequest updateManyAndReturn
   */
  export type LeaveRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * The data used to update LeaveRequests.
     */
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyInput>
    /**
     * Filter which LeaveRequests to update
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveRequest upsert
   */
  export type LeaveRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveRequest to update in case it exists.
     */
    where: LeaveRequestWhereUniqueInput
    /**
     * In case the LeaveRequest found by the `where` argument doesn't exist, create a new LeaveRequest with this data.
     */
    create: XOR<LeaveRequestCreateInput, LeaveRequestUncheckedCreateInput>
    /**
     * In case the LeaveRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveRequestUpdateInput, LeaveRequestUncheckedUpdateInput>
  }

  /**
   * LeaveRequest delete
   */
  export type LeaveRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter which LeaveRequest to delete.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest deleteMany
   */
  export type LeaveRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveRequests to delete
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to delete.
     */
    limit?: number
  }

  /**
   * LeaveRequest without action
   */
  export type LeaveRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeDocument
   */

  export type AggregateEmployeeDocument = {
    _count: EmployeeDocumentCountAggregateOutputType | null
    _avg: EmployeeDocumentAvgAggregateOutputType | null
    _sum: EmployeeDocumentSumAggregateOutputType | null
    _min: EmployeeDocumentMinAggregateOutputType | null
    _max: EmployeeDocumentMaxAggregateOutputType | null
  }

  export type EmployeeDocumentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type EmployeeDocumentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type EmployeeDocumentMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    title: string | null
    fileKey: string | null
    fileSize: number | null
    mimeType: string | null
    uploadDate: Date | null
    category: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeDocumentMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    title: string | null
    fileKey: string | null
    fileSize: number | null
    mimeType: string | null
    uploadDate: Date | null
    category: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeDocumentCountAggregateOutputType = {
    id: number
    employeeId: number
    title: number
    fileKey: number
    fileSize: number
    mimeType: number
    uploadDate: number
    category: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeDocumentAvgAggregateInputType = {
    fileSize?: true
  }

  export type EmployeeDocumentSumAggregateInputType = {
    fileSize?: true
  }

  export type EmployeeDocumentMinAggregateInputType = {
    id?: true
    employeeId?: true
    title?: true
    fileKey?: true
    fileSize?: true
    mimeType?: true
    uploadDate?: true
    category?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeDocumentMaxAggregateInputType = {
    id?: true
    employeeId?: true
    title?: true
    fileKey?: true
    fileSize?: true
    mimeType?: true
    uploadDate?: true
    category?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeDocumentCountAggregateInputType = {
    id?: true
    employeeId?: true
    title?: true
    fileKey?: true
    fileSize?: true
    mimeType?: true
    uploadDate?: true
    category?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeDocument to aggregate.
     */
    where?: EmployeeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeDocuments to fetch.
     */
    orderBy?: EmployeeDocumentOrderByWithRelationInput | EmployeeDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeDocuments
    **/
    _count?: true | EmployeeDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeDocumentMaxAggregateInputType
  }

  export type GetEmployeeDocumentAggregateType<T extends EmployeeDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeDocument[P]>
      : GetScalarType<T[P], AggregateEmployeeDocument[P]>
  }




  export type EmployeeDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeDocumentWhereInput
    orderBy?: EmployeeDocumentOrderByWithAggregationInput | EmployeeDocumentOrderByWithAggregationInput[]
    by: EmployeeDocumentScalarFieldEnum[] | EmployeeDocumentScalarFieldEnum
    having?: EmployeeDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeDocumentCountAggregateInputType | true
    _avg?: EmployeeDocumentAvgAggregateInputType
    _sum?: EmployeeDocumentSumAggregateInputType
    _min?: EmployeeDocumentMinAggregateInputType
    _max?: EmployeeDocumentMaxAggregateInputType
  }

  export type EmployeeDocumentGroupByOutputType = {
    id: string
    employeeId: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate: Date
    category: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmployeeDocumentCountAggregateOutputType | null
    _avg: EmployeeDocumentAvgAggregateOutputType | null
    _sum: EmployeeDocumentSumAggregateOutputType | null
    _min: EmployeeDocumentMinAggregateOutputType | null
    _max: EmployeeDocumentMaxAggregateOutputType | null
  }

  type GetEmployeeDocumentGroupByPayload<T extends EmployeeDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeDocumentGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    title?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeDocument"]>

  export type EmployeeDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    title?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeDocument"]>

  export type EmployeeDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    title?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeDocument"]>

  export type EmployeeDocumentSelectScalar = {
    id?: boolean
    employeeId?: boolean
    title?: boolean
    fileKey?: boolean
    fileSize?: boolean
    mimeType?: boolean
    uploadDate?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "title" | "fileKey" | "fileSize" | "mimeType" | "uploadDate" | "category" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["employeeDocument"]>
  export type EmployeeDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmployeeDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeDocument"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      title: string
      fileKey: string
      fileSize: number
      mimeType: string
      uploadDate: Date
      category: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employeeDocument"]>
    composites: {}
  }

  type EmployeeDocumentGetPayload<S extends boolean | null | undefined | EmployeeDocumentDefaultArgs> = $Result.GetResult<Prisma.$EmployeeDocumentPayload, S>

  type EmployeeDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeDocumentCountAggregateInputType | true
    }

  export interface EmployeeDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeDocument'], meta: { name: 'EmployeeDocument' } }
    /**
     * Find zero or one EmployeeDocument that matches the filter.
     * @param {EmployeeDocumentFindUniqueArgs} args - Arguments to find a EmployeeDocument
     * @example
     * // Get one EmployeeDocument
     * const employeeDocument = await prisma.employeeDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeDocumentFindUniqueArgs>(args: SelectSubset<T, EmployeeDocumentFindUniqueArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeDocumentFindUniqueOrThrowArgs} args - Arguments to find a EmployeeDocument
     * @example
     * // Get one EmployeeDocument
     * const employeeDocument = await prisma.employeeDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentFindFirstArgs} args - Arguments to find a EmployeeDocument
     * @example
     * // Get one EmployeeDocument
     * const employeeDocument = await prisma.employeeDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeDocumentFindFirstArgs>(args?: SelectSubset<T, EmployeeDocumentFindFirstArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentFindFirstOrThrowArgs} args - Arguments to find a EmployeeDocument
     * @example
     * // Get one EmployeeDocument
     * const employeeDocument = await prisma.employeeDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeDocuments
     * const employeeDocuments = await prisma.employeeDocument.findMany()
     * 
     * // Get first 10 EmployeeDocuments
     * const employeeDocuments = await prisma.employeeDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeDocumentWithIdOnly = await prisma.employeeDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeDocumentFindManyArgs>(args?: SelectSubset<T, EmployeeDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeDocument.
     * @param {EmployeeDocumentCreateArgs} args - Arguments to create a EmployeeDocument.
     * @example
     * // Create one EmployeeDocument
     * const EmployeeDocument = await prisma.employeeDocument.create({
     *   data: {
     *     // ... data to create a EmployeeDocument
     *   }
     * })
     * 
     */
    create<T extends EmployeeDocumentCreateArgs>(args: SelectSubset<T, EmployeeDocumentCreateArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeDocuments.
     * @param {EmployeeDocumentCreateManyArgs} args - Arguments to create many EmployeeDocuments.
     * @example
     * // Create many EmployeeDocuments
     * const employeeDocument = await prisma.employeeDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeDocumentCreateManyArgs>(args?: SelectSubset<T, EmployeeDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeDocuments and returns the data saved in the database.
     * @param {EmployeeDocumentCreateManyAndReturnArgs} args - Arguments to create many EmployeeDocuments.
     * @example
     * // Create many EmployeeDocuments
     * const employeeDocument = await prisma.employeeDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeDocuments and only return the `id`
     * const employeeDocumentWithIdOnly = await prisma.employeeDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeDocument.
     * @param {EmployeeDocumentDeleteArgs} args - Arguments to delete one EmployeeDocument.
     * @example
     * // Delete one EmployeeDocument
     * const EmployeeDocument = await prisma.employeeDocument.delete({
     *   where: {
     *     // ... filter to delete one EmployeeDocument
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDocumentDeleteArgs>(args: SelectSubset<T, EmployeeDocumentDeleteArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeDocument.
     * @param {EmployeeDocumentUpdateArgs} args - Arguments to update one EmployeeDocument.
     * @example
     * // Update one EmployeeDocument
     * const employeeDocument = await prisma.employeeDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeDocumentUpdateArgs>(args: SelectSubset<T, EmployeeDocumentUpdateArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeDocuments.
     * @param {EmployeeDocumentDeleteManyArgs} args - Arguments to filter EmployeeDocuments to delete.
     * @example
     * // Delete a few EmployeeDocuments
     * const { count } = await prisma.employeeDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDocumentDeleteManyArgs>(args?: SelectSubset<T, EmployeeDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeDocuments
     * const employeeDocument = await prisma.employeeDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeDocumentUpdateManyArgs>(args: SelectSubset<T, EmployeeDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeDocuments and returns the data updated in the database.
     * @param {EmployeeDocumentUpdateManyAndReturnArgs} args - Arguments to update many EmployeeDocuments.
     * @example
     * // Update many EmployeeDocuments
     * const employeeDocument = await prisma.employeeDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeDocuments and only return the `id`
     * const employeeDocumentWithIdOnly = await prisma.employeeDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeDocument.
     * @param {EmployeeDocumentUpsertArgs} args - Arguments to update or create a EmployeeDocument.
     * @example
     * // Update or create a EmployeeDocument
     * const employeeDocument = await prisma.employeeDocument.upsert({
     *   create: {
     *     // ... data to create a EmployeeDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeDocument we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeDocumentUpsertArgs>(args: SelectSubset<T, EmployeeDocumentUpsertArgs<ExtArgs>>): Prisma__EmployeeDocumentClient<$Result.GetResult<Prisma.$EmployeeDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentCountArgs} args - Arguments to filter EmployeeDocuments to count.
     * @example
     * // Count the number of EmployeeDocuments
     * const count = await prisma.employeeDocument.count({
     *   where: {
     *     // ... the filter for the EmployeeDocuments we want to count
     *   }
     * })
    **/
    count<T extends EmployeeDocumentCountArgs>(
      args?: Subset<T, EmployeeDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeDocumentAggregateArgs>(args: Subset<T, EmployeeDocumentAggregateArgs>): Prisma.PrismaPromise<GetEmployeeDocumentAggregateType<T>>

    /**
     * Group by EmployeeDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeDocumentGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeDocument model
   */
  readonly fields: EmployeeDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeDocument model
   */
  interface EmployeeDocumentFieldRefs {
    readonly id: FieldRef<"EmployeeDocument", 'String'>
    readonly employeeId: FieldRef<"EmployeeDocument", 'String'>
    readonly title: FieldRef<"EmployeeDocument", 'String'>
    readonly fileKey: FieldRef<"EmployeeDocument", 'String'>
    readonly fileSize: FieldRef<"EmployeeDocument", 'Int'>
    readonly mimeType: FieldRef<"EmployeeDocument", 'String'>
    readonly uploadDate: FieldRef<"EmployeeDocument", 'DateTime'>
    readonly category: FieldRef<"EmployeeDocument", 'String'>
    readonly notes: FieldRef<"EmployeeDocument", 'String'>
    readonly createdAt: FieldRef<"EmployeeDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"EmployeeDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeDocument findUnique
   */
  export type EmployeeDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeDocument to fetch.
     */
    where: EmployeeDocumentWhereUniqueInput
  }

  /**
   * EmployeeDocument findUniqueOrThrow
   */
  export type EmployeeDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeDocument to fetch.
     */
    where: EmployeeDocumentWhereUniqueInput
  }

  /**
   * EmployeeDocument findFirst
   */
  export type EmployeeDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeDocument to fetch.
     */
    where?: EmployeeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeDocuments to fetch.
     */
    orderBy?: EmployeeDocumentOrderByWithRelationInput | EmployeeDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeDocuments.
     */
    cursor?: EmployeeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeDocuments.
     */
    distinct?: EmployeeDocumentScalarFieldEnum | EmployeeDocumentScalarFieldEnum[]
  }

  /**
   * EmployeeDocument findFirstOrThrow
   */
  export type EmployeeDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeDocument to fetch.
     */
    where?: EmployeeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeDocuments to fetch.
     */
    orderBy?: EmployeeDocumentOrderByWithRelationInput | EmployeeDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeDocuments.
     */
    cursor?: EmployeeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeDocuments.
     */
    distinct?: EmployeeDocumentScalarFieldEnum | EmployeeDocumentScalarFieldEnum[]
  }

  /**
   * EmployeeDocument findMany
   */
  export type EmployeeDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeDocuments to fetch.
     */
    where?: EmployeeDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeDocuments to fetch.
     */
    orderBy?: EmployeeDocumentOrderByWithRelationInput | EmployeeDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeDocuments.
     */
    cursor?: EmployeeDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeDocuments.
     */
    skip?: number
    distinct?: EmployeeDocumentScalarFieldEnum | EmployeeDocumentScalarFieldEnum[]
  }

  /**
   * EmployeeDocument create
   */
  export type EmployeeDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeDocument.
     */
    data: XOR<EmployeeDocumentCreateInput, EmployeeDocumentUncheckedCreateInput>
  }

  /**
   * EmployeeDocument createMany
   */
  export type EmployeeDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeDocuments.
     */
    data: EmployeeDocumentCreateManyInput | EmployeeDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeDocument createManyAndReturn
   */
  export type EmployeeDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeDocuments.
     */
    data: EmployeeDocumentCreateManyInput | EmployeeDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeDocument update
   */
  export type EmployeeDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeDocument.
     */
    data: XOR<EmployeeDocumentUpdateInput, EmployeeDocumentUncheckedUpdateInput>
    /**
     * Choose, which EmployeeDocument to update.
     */
    where: EmployeeDocumentWhereUniqueInput
  }

  /**
   * EmployeeDocument updateMany
   */
  export type EmployeeDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeDocuments.
     */
    data: XOR<EmployeeDocumentUpdateManyMutationInput, EmployeeDocumentUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeDocuments to update
     */
    where?: EmployeeDocumentWhereInput
    /**
     * Limit how many EmployeeDocuments to update.
     */
    limit?: number
  }

  /**
   * EmployeeDocument updateManyAndReturn
   */
  export type EmployeeDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeDocuments.
     */
    data: XOR<EmployeeDocumentUpdateManyMutationInput, EmployeeDocumentUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeDocuments to update
     */
    where?: EmployeeDocumentWhereInput
    /**
     * Limit how many EmployeeDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeDocument upsert
   */
  export type EmployeeDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeDocument to update in case it exists.
     */
    where: EmployeeDocumentWhereUniqueInput
    /**
     * In case the EmployeeDocument found by the `where` argument doesn't exist, create a new EmployeeDocument with this data.
     */
    create: XOR<EmployeeDocumentCreateInput, EmployeeDocumentUncheckedCreateInput>
    /**
     * In case the EmployeeDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeDocumentUpdateInput, EmployeeDocumentUncheckedUpdateInput>
  }

  /**
   * EmployeeDocument delete
   */
  export type EmployeeDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
    /**
     * Filter which EmployeeDocument to delete.
     */
    where: EmployeeDocumentWhereUniqueInput
  }

  /**
   * EmployeeDocument deleteMany
   */
  export type EmployeeDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeDocuments to delete
     */
    where?: EmployeeDocumentWhereInput
    /**
     * Limit how many EmployeeDocuments to delete.
     */
    limit?: number
  }

  /**
   * EmployeeDocument without action
   */
  export type EmployeeDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeDocument
     */
    select?: EmployeeDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeDocument
     */
    omit?: EmployeeDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeDocumentInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeLeaveBalance
   */

  export type AggregateEmployeeLeaveBalance = {
    _count: EmployeeLeaveBalanceCountAggregateOutputType | null
    _avg: EmployeeLeaveBalanceAvgAggregateOutputType | null
    _sum: EmployeeLeaveBalanceSumAggregateOutputType | null
    _min: EmployeeLeaveBalanceMinAggregateOutputType | null
    _max: EmployeeLeaveBalanceMaxAggregateOutputType | null
  }

  export type EmployeeLeaveBalanceAvgAggregateOutputType = {
    year: number | null
    annualLeaveTotal: number | null
    annualLeaveUsed: number | null
    sickLeaveTotal: number | null
    sickLeaveUsed: number | null
  }

  export type EmployeeLeaveBalanceSumAggregateOutputType = {
    year: number | null
    annualLeaveTotal: number | null
    annualLeaveUsed: number | null
    sickLeaveTotal: number | null
    sickLeaveUsed: number | null
  }

  export type EmployeeLeaveBalanceMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    year: number | null
    annualLeaveTotal: number | null
    annualLeaveUsed: number | null
    sickLeaveTotal: number | null
    sickLeaveUsed: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeLeaveBalanceMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    year: number | null
    annualLeaveTotal: number | null
    annualLeaveUsed: number | null
    sickLeaveTotal: number | null
    sickLeaveUsed: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeLeaveBalanceCountAggregateOutputType = {
    id: number
    employeeId: number
    year: number
    annualLeaveTotal: number
    annualLeaveUsed: number
    sickLeaveTotal: number
    sickLeaveUsed: number
    lastUpdated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeLeaveBalanceAvgAggregateInputType = {
    year?: true
    annualLeaveTotal?: true
    annualLeaveUsed?: true
    sickLeaveTotal?: true
    sickLeaveUsed?: true
  }

  export type EmployeeLeaveBalanceSumAggregateInputType = {
    year?: true
    annualLeaveTotal?: true
    annualLeaveUsed?: true
    sickLeaveTotal?: true
    sickLeaveUsed?: true
  }

  export type EmployeeLeaveBalanceMinAggregateInputType = {
    id?: true
    employeeId?: true
    year?: true
    annualLeaveTotal?: true
    annualLeaveUsed?: true
    sickLeaveTotal?: true
    sickLeaveUsed?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeLeaveBalanceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    year?: true
    annualLeaveTotal?: true
    annualLeaveUsed?: true
    sickLeaveTotal?: true
    sickLeaveUsed?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeLeaveBalanceCountAggregateInputType = {
    id?: true
    employeeId?: true
    year?: true
    annualLeaveTotal?: true
    annualLeaveUsed?: true
    sickLeaveTotal?: true
    sickLeaveUsed?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeLeaveBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeLeaveBalance to aggregate.
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLeaveBalances to fetch.
     */
    orderBy?: EmployeeLeaveBalanceOrderByWithRelationInput | EmployeeLeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeLeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeLeaveBalances
    **/
    _count?: true | EmployeeLeaveBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeLeaveBalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeLeaveBalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeLeaveBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeLeaveBalanceMaxAggregateInputType
  }

  export type GetEmployeeLeaveBalanceAggregateType<T extends EmployeeLeaveBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeLeaveBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeLeaveBalance[P]>
      : GetScalarType<T[P], AggregateEmployeeLeaveBalance[P]>
  }




  export type EmployeeLeaveBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeLeaveBalanceWhereInput
    orderBy?: EmployeeLeaveBalanceOrderByWithAggregationInput | EmployeeLeaveBalanceOrderByWithAggregationInput[]
    by: EmployeeLeaveBalanceScalarFieldEnum[] | EmployeeLeaveBalanceScalarFieldEnum
    having?: EmployeeLeaveBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeLeaveBalanceCountAggregateInputType | true
    _avg?: EmployeeLeaveBalanceAvgAggregateInputType
    _sum?: EmployeeLeaveBalanceSumAggregateInputType
    _min?: EmployeeLeaveBalanceMinAggregateInputType
    _max?: EmployeeLeaveBalanceMaxAggregateInputType
  }

  export type EmployeeLeaveBalanceGroupByOutputType = {
    id: string
    employeeId: string
    year: number
    annualLeaveTotal: number
    annualLeaveUsed: number
    sickLeaveTotal: number
    sickLeaveUsed: number
    lastUpdated: Date
    createdAt: Date
    updatedAt: Date
    _count: EmployeeLeaveBalanceCountAggregateOutputType | null
    _avg: EmployeeLeaveBalanceAvgAggregateOutputType | null
    _sum: EmployeeLeaveBalanceSumAggregateOutputType | null
    _min: EmployeeLeaveBalanceMinAggregateOutputType | null
    _max: EmployeeLeaveBalanceMaxAggregateOutputType | null
  }

  type GetEmployeeLeaveBalanceGroupByPayload<T extends EmployeeLeaveBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeLeaveBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeLeaveBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeLeaveBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeLeaveBalanceGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeLeaveBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    year?: boolean
    annualLeaveTotal?: boolean
    annualLeaveUsed?: boolean
    sickLeaveTotal?: boolean
    sickLeaveUsed?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeLeaveBalance"]>

  export type EmployeeLeaveBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    year?: boolean
    annualLeaveTotal?: boolean
    annualLeaveUsed?: boolean
    sickLeaveTotal?: boolean
    sickLeaveUsed?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeLeaveBalance"]>

  export type EmployeeLeaveBalanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    year?: boolean
    annualLeaveTotal?: boolean
    annualLeaveUsed?: boolean
    sickLeaveTotal?: boolean
    sickLeaveUsed?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeLeaveBalance"]>

  export type EmployeeLeaveBalanceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    year?: boolean
    annualLeaveTotal?: boolean
    annualLeaveUsed?: boolean
    sickLeaveTotal?: boolean
    sickLeaveUsed?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeLeaveBalanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "year" | "annualLeaveTotal" | "annualLeaveUsed" | "sickLeaveTotal" | "sickLeaveUsed" | "lastUpdated" | "createdAt" | "updatedAt", ExtArgs["result"]["employeeLeaveBalance"]>
  export type EmployeeLeaveBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeLeaveBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeLeaveBalanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmployeeLeaveBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeLeaveBalance"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      year: number
      annualLeaveTotal: number
      annualLeaveUsed: number
      sickLeaveTotal: number
      sickLeaveUsed: number
      lastUpdated: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employeeLeaveBalance"]>
    composites: {}
  }

  type EmployeeLeaveBalanceGetPayload<S extends boolean | null | undefined | EmployeeLeaveBalanceDefaultArgs> = $Result.GetResult<Prisma.$EmployeeLeaveBalancePayload, S>

  type EmployeeLeaveBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeLeaveBalanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeLeaveBalanceCountAggregateInputType | true
    }

  export interface EmployeeLeaveBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeLeaveBalance'], meta: { name: 'EmployeeLeaveBalance' } }
    /**
     * Find zero or one EmployeeLeaveBalance that matches the filter.
     * @param {EmployeeLeaveBalanceFindUniqueArgs} args - Arguments to find a EmployeeLeaveBalance
     * @example
     * // Get one EmployeeLeaveBalance
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeLeaveBalanceFindUniqueArgs>(args: SelectSubset<T, EmployeeLeaveBalanceFindUniqueArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeLeaveBalance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeLeaveBalanceFindUniqueOrThrowArgs} args - Arguments to find a EmployeeLeaveBalance
     * @example
     * // Get one EmployeeLeaveBalance
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeLeaveBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeLeaveBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeLeaveBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceFindFirstArgs} args - Arguments to find a EmployeeLeaveBalance
     * @example
     * // Get one EmployeeLeaveBalance
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeLeaveBalanceFindFirstArgs>(args?: SelectSubset<T, EmployeeLeaveBalanceFindFirstArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeLeaveBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceFindFirstOrThrowArgs} args - Arguments to find a EmployeeLeaveBalance
     * @example
     * // Get one EmployeeLeaveBalance
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeLeaveBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeLeaveBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeLeaveBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeLeaveBalances
     * const employeeLeaveBalances = await prisma.employeeLeaveBalance.findMany()
     * 
     * // Get first 10 EmployeeLeaveBalances
     * const employeeLeaveBalances = await prisma.employeeLeaveBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeLeaveBalanceWithIdOnly = await prisma.employeeLeaveBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeLeaveBalanceFindManyArgs>(args?: SelectSubset<T, EmployeeLeaveBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeLeaveBalance.
     * @param {EmployeeLeaveBalanceCreateArgs} args - Arguments to create a EmployeeLeaveBalance.
     * @example
     * // Create one EmployeeLeaveBalance
     * const EmployeeLeaveBalance = await prisma.employeeLeaveBalance.create({
     *   data: {
     *     // ... data to create a EmployeeLeaveBalance
     *   }
     * })
     * 
     */
    create<T extends EmployeeLeaveBalanceCreateArgs>(args: SelectSubset<T, EmployeeLeaveBalanceCreateArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeLeaveBalances.
     * @param {EmployeeLeaveBalanceCreateManyArgs} args - Arguments to create many EmployeeLeaveBalances.
     * @example
     * // Create many EmployeeLeaveBalances
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeLeaveBalanceCreateManyArgs>(args?: SelectSubset<T, EmployeeLeaveBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeLeaveBalances and returns the data saved in the database.
     * @param {EmployeeLeaveBalanceCreateManyAndReturnArgs} args - Arguments to create many EmployeeLeaveBalances.
     * @example
     * // Create many EmployeeLeaveBalances
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeLeaveBalances and only return the `id`
     * const employeeLeaveBalanceWithIdOnly = await prisma.employeeLeaveBalance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeLeaveBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeLeaveBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeLeaveBalance.
     * @param {EmployeeLeaveBalanceDeleteArgs} args - Arguments to delete one EmployeeLeaveBalance.
     * @example
     * // Delete one EmployeeLeaveBalance
     * const EmployeeLeaveBalance = await prisma.employeeLeaveBalance.delete({
     *   where: {
     *     // ... filter to delete one EmployeeLeaveBalance
     *   }
     * })
     * 
     */
    delete<T extends EmployeeLeaveBalanceDeleteArgs>(args: SelectSubset<T, EmployeeLeaveBalanceDeleteArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeLeaveBalance.
     * @param {EmployeeLeaveBalanceUpdateArgs} args - Arguments to update one EmployeeLeaveBalance.
     * @example
     * // Update one EmployeeLeaveBalance
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeLeaveBalanceUpdateArgs>(args: SelectSubset<T, EmployeeLeaveBalanceUpdateArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeLeaveBalances.
     * @param {EmployeeLeaveBalanceDeleteManyArgs} args - Arguments to filter EmployeeLeaveBalances to delete.
     * @example
     * // Delete a few EmployeeLeaveBalances
     * const { count } = await prisma.employeeLeaveBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeLeaveBalanceDeleteManyArgs>(args?: SelectSubset<T, EmployeeLeaveBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeLeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeLeaveBalances
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeLeaveBalanceUpdateManyArgs>(args: SelectSubset<T, EmployeeLeaveBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeLeaveBalances and returns the data updated in the database.
     * @param {EmployeeLeaveBalanceUpdateManyAndReturnArgs} args - Arguments to update many EmployeeLeaveBalances.
     * @example
     * // Update many EmployeeLeaveBalances
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeLeaveBalances and only return the `id`
     * const employeeLeaveBalanceWithIdOnly = await prisma.employeeLeaveBalance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeLeaveBalanceUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeLeaveBalanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeLeaveBalance.
     * @param {EmployeeLeaveBalanceUpsertArgs} args - Arguments to update or create a EmployeeLeaveBalance.
     * @example
     * // Update or create a EmployeeLeaveBalance
     * const employeeLeaveBalance = await prisma.employeeLeaveBalance.upsert({
     *   create: {
     *     // ... data to create a EmployeeLeaveBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeLeaveBalance we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeLeaveBalanceUpsertArgs>(args: SelectSubset<T, EmployeeLeaveBalanceUpsertArgs<ExtArgs>>): Prisma__EmployeeLeaveBalanceClient<$Result.GetResult<Prisma.$EmployeeLeaveBalancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeLeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceCountArgs} args - Arguments to filter EmployeeLeaveBalances to count.
     * @example
     * // Count the number of EmployeeLeaveBalances
     * const count = await prisma.employeeLeaveBalance.count({
     *   where: {
     *     // ... the filter for the EmployeeLeaveBalances we want to count
     *   }
     * })
    **/
    count<T extends EmployeeLeaveBalanceCountArgs>(
      args?: Subset<T, EmployeeLeaveBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeLeaveBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeLeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeLeaveBalanceAggregateArgs>(args: Subset<T, EmployeeLeaveBalanceAggregateArgs>): Prisma.PrismaPromise<GetEmployeeLeaveBalanceAggregateType<T>>

    /**
     * Group by EmployeeLeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLeaveBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeLeaveBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeLeaveBalanceGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeLeaveBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeLeaveBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeLeaveBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeLeaveBalance model
   */
  readonly fields: EmployeeLeaveBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeLeaveBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeLeaveBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeLeaveBalance model
   */
  interface EmployeeLeaveBalanceFieldRefs {
    readonly id: FieldRef<"EmployeeLeaveBalance", 'String'>
    readonly employeeId: FieldRef<"EmployeeLeaveBalance", 'String'>
    readonly year: FieldRef<"EmployeeLeaveBalance", 'Int'>
    readonly annualLeaveTotal: FieldRef<"EmployeeLeaveBalance", 'Int'>
    readonly annualLeaveUsed: FieldRef<"EmployeeLeaveBalance", 'Int'>
    readonly sickLeaveTotal: FieldRef<"EmployeeLeaveBalance", 'Int'>
    readonly sickLeaveUsed: FieldRef<"EmployeeLeaveBalance", 'Int'>
    readonly lastUpdated: FieldRef<"EmployeeLeaveBalance", 'DateTime'>
    readonly createdAt: FieldRef<"EmployeeLeaveBalance", 'DateTime'>
    readonly updatedAt: FieldRef<"EmployeeLeaveBalance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeLeaveBalance findUnique
   */
  export type EmployeeLeaveBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLeaveBalance to fetch.
     */
    where: EmployeeLeaveBalanceWhereUniqueInput
  }

  /**
   * EmployeeLeaveBalance findUniqueOrThrow
   */
  export type EmployeeLeaveBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLeaveBalance to fetch.
     */
    where: EmployeeLeaveBalanceWhereUniqueInput
  }

  /**
   * EmployeeLeaveBalance findFirst
   */
  export type EmployeeLeaveBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLeaveBalance to fetch.
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLeaveBalances to fetch.
     */
    orderBy?: EmployeeLeaveBalanceOrderByWithRelationInput | EmployeeLeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeLeaveBalances.
     */
    cursor?: EmployeeLeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeLeaveBalances.
     */
    distinct?: EmployeeLeaveBalanceScalarFieldEnum | EmployeeLeaveBalanceScalarFieldEnum[]
  }

  /**
   * EmployeeLeaveBalance findFirstOrThrow
   */
  export type EmployeeLeaveBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLeaveBalance to fetch.
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLeaveBalances to fetch.
     */
    orderBy?: EmployeeLeaveBalanceOrderByWithRelationInput | EmployeeLeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeLeaveBalances.
     */
    cursor?: EmployeeLeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeLeaveBalances.
     */
    distinct?: EmployeeLeaveBalanceScalarFieldEnum | EmployeeLeaveBalanceScalarFieldEnum[]
  }

  /**
   * EmployeeLeaveBalance findMany
   */
  export type EmployeeLeaveBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLeaveBalances to fetch.
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLeaveBalances to fetch.
     */
    orderBy?: EmployeeLeaveBalanceOrderByWithRelationInput | EmployeeLeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeLeaveBalances.
     */
    cursor?: EmployeeLeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLeaveBalances.
     */
    skip?: number
    distinct?: EmployeeLeaveBalanceScalarFieldEnum | EmployeeLeaveBalanceScalarFieldEnum[]
  }

  /**
   * EmployeeLeaveBalance create
   */
  export type EmployeeLeaveBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeLeaveBalance.
     */
    data: XOR<EmployeeLeaveBalanceCreateInput, EmployeeLeaveBalanceUncheckedCreateInput>
  }

  /**
   * EmployeeLeaveBalance createMany
   */
  export type EmployeeLeaveBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeLeaveBalances.
     */
    data: EmployeeLeaveBalanceCreateManyInput | EmployeeLeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeLeaveBalance createManyAndReturn
   */
  export type EmployeeLeaveBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeLeaveBalances.
     */
    data: EmployeeLeaveBalanceCreateManyInput | EmployeeLeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeLeaveBalance update
   */
  export type EmployeeLeaveBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeLeaveBalance.
     */
    data: XOR<EmployeeLeaveBalanceUpdateInput, EmployeeLeaveBalanceUncheckedUpdateInput>
    /**
     * Choose, which EmployeeLeaveBalance to update.
     */
    where: EmployeeLeaveBalanceWhereUniqueInput
  }

  /**
   * EmployeeLeaveBalance updateMany
   */
  export type EmployeeLeaveBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeLeaveBalances.
     */
    data: XOR<EmployeeLeaveBalanceUpdateManyMutationInput, EmployeeLeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeLeaveBalances to update
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * Limit how many EmployeeLeaveBalances to update.
     */
    limit?: number
  }

  /**
   * EmployeeLeaveBalance updateManyAndReturn
   */
  export type EmployeeLeaveBalanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeLeaveBalances.
     */
    data: XOR<EmployeeLeaveBalanceUpdateManyMutationInput, EmployeeLeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeLeaveBalances to update
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * Limit how many EmployeeLeaveBalances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeLeaveBalance upsert
   */
  export type EmployeeLeaveBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeLeaveBalance to update in case it exists.
     */
    where: EmployeeLeaveBalanceWhereUniqueInput
    /**
     * In case the EmployeeLeaveBalance found by the `where` argument doesn't exist, create a new EmployeeLeaveBalance with this data.
     */
    create: XOR<EmployeeLeaveBalanceCreateInput, EmployeeLeaveBalanceUncheckedCreateInput>
    /**
     * In case the EmployeeLeaveBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeLeaveBalanceUpdateInput, EmployeeLeaveBalanceUncheckedUpdateInput>
  }

  /**
   * EmployeeLeaveBalance delete
   */
  export type EmployeeLeaveBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter which EmployeeLeaveBalance to delete.
     */
    where: EmployeeLeaveBalanceWhereUniqueInput
  }

  /**
   * EmployeeLeaveBalance deleteMany
   */
  export type EmployeeLeaveBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeLeaveBalances to delete
     */
    where?: EmployeeLeaveBalanceWhereInput
    /**
     * Limit how many EmployeeLeaveBalances to delete.
     */
    limit?: number
  }

  /**
   * EmployeeLeaveBalance without action
   */
  export type EmployeeLeaveBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLeaveBalance
     */
    select?: EmployeeLeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLeaveBalance
     */
    omit?: EmployeeLeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLeaveBalanceInclude<ExtArgs> | null
  }


  /**
   * Model BonusType
   */

  export type AggregateBonusType = {
    _count: BonusTypeCountAggregateOutputType | null
    _min: BonusTypeMinAggregateOutputType | null
    _max: BonusTypeMaxAggregateOutputType | null
  }

  export type BonusTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BonusTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BonusTypeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BonusTypeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BonusTypeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BonusTypeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BonusTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BonusType to aggregate.
     */
    where?: BonusTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BonusTypes to fetch.
     */
    orderBy?: BonusTypeOrderByWithRelationInput | BonusTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BonusTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BonusTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BonusTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BonusTypes
    **/
    _count?: true | BonusTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BonusTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BonusTypeMaxAggregateInputType
  }

  export type GetBonusTypeAggregateType<T extends BonusTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateBonusType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBonusType[P]>
      : GetScalarType<T[P], AggregateBonusType[P]>
  }




  export type BonusTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BonusTypeWhereInput
    orderBy?: BonusTypeOrderByWithAggregationInput | BonusTypeOrderByWithAggregationInput[]
    by: BonusTypeScalarFieldEnum[] | BonusTypeScalarFieldEnum
    having?: BonusTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BonusTypeCountAggregateInputType | true
    _min?: BonusTypeMinAggregateInputType
    _max?: BonusTypeMaxAggregateInputType
  }

  export type BonusTypeGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: BonusTypeCountAggregateOutputType | null
    _min: BonusTypeMinAggregateOutputType | null
    _max: BonusTypeMaxAggregateOutputType | null
  }

  type GetBonusTypeGroupByPayload<T extends BonusTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BonusTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BonusTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BonusTypeGroupByOutputType[P]>
            : GetScalarType<T[P], BonusTypeGroupByOutputType[P]>
        }
      >
    >


  export type BonusTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payments?: boolean | BonusType$paymentsArgs<ExtArgs>
    _count?: boolean | BonusTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bonusType"]>

  export type BonusTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bonusType"]>

  export type BonusTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bonusType"]>

  export type BonusTypeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BonusTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["bonusType"]>
  export type BonusTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | BonusType$paymentsArgs<ExtArgs>
    _count?: boolean | BonusTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BonusTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BonusTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BonusTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BonusType"
    objects: {
      payments: Prisma.$SalaryPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bonusType"]>
    composites: {}
  }

  type BonusTypeGetPayload<S extends boolean | null | undefined | BonusTypeDefaultArgs> = $Result.GetResult<Prisma.$BonusTypePayload, S>

  type BonusTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BonusTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BonusTypeCountAggregateInputType | true
    }

  export interface BonusTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BonusType'], meta: { name: 'BonusType' } }
    /**
     * Find zero or one BonusType that matches the filter.
     * @param {BonusTypeFindUniqueArgs} args - Arguments to find a BonusType
     * @example
     * // Get one BonusType
     * const bonusType = await prisma.bonusType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BonusTypeFindUniqueArgs>(args: SelectSubset<T, BonusTypeFindUniqueArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BonusType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BonusTypeFindUniqueOrThrowArgs} args - Arguments to find a BonusType
     * @example
     * // Get one BonusType
     * const bonusType = await prisma.bonusType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BonusTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, BonusTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BonusType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeFindFirstArgs} args - Arguments to find a BonusType
     * @example
     * // Get one BonusType
     * const bonusType = await prisma.bonusType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BonusTypeFindFirstArgs>(args?: SelectSubset<T, BonusTypeFindFirstArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BonusType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeFindFirstOrThrowArgs} args - Arguments to find a BonusType
     * @example
     * // Get one BonusType
     * const bonusType = await prisma.bonusType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BonusTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, BonusTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BonusTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BonusTypes
     * const bonusTypes = await prisma.bonusType.findMany()
     * 
     * // Get first 10 BonusTypes
     * const bonusTypes = await prisma.bonusType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bonusTypeWithIdOnly = await prisma.bonusType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BonusTypeFindManyArgs>(args?: SelectSubset<T, BonusTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BonusType.
     * @param {BonusTypeCreateArgs} args - Arguments to create a BonusType.
     * @example
     * // Create one BonusType
     * const BonusType = await prisma.bonusType.create({
     *   data: {
     *     // ... data to create a BonusType
     *   }
     * })
     * 
     */
    create<T extends BonusTypeCreateArgs>(args: SelectSubset<T, BonusTypeCreateArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BonusTypes.
     * @param {BonusTypeCreateManyArgs} args - Arguments to create many BonusTypes.
     * @example
     * // Create many BonusTypes
     * const bonusType = await prisma.bonusType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BonusTypeCreateManyArgs>(args?: SelectSubset<T, BonusTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BonusTypes and returns the data saved in the database.
     * @param {BonusTypeCreateManyAndReturnArgs} args - Arguments to create many BonusTypes.
     * @example
     * // Create many BonusTypes
     * const bonusType = await prisma.bonusType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BonusTypes and only return the `id`
     * const bonusTypeWithIdOnly = await prisma.bonusType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BonusTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, BonusTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BonusType.
     * @param {BonusTypeDeleteArgs} args - Arguments to delete one BonusType.
     * @example
     * // Delete one BonusType
     * const BonusType = await prisma.bonusType.delete({
     *   where: {
     *     // ... filter to delete one BonusType
     *   }
     * })
     * 
     */
    delete<T extends BonusTypeDeleteArgs>(args: SelectSubset<T, BonusTypeDeleteArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BonusType.
     * @param {BonusTypeUpdateArgs} args - Arguments to update one BonusType.
     * @example
     * // Update one BonusType
     * const bonusType = await prisma.bonusType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BonusTypeUpdateArgs>(args: SelectSubset<T, BonusTypeUpdateArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BonusTypes.
     * @param {BonusTypeDeleteManyArgs} args - Arguments to filter BonusTypes to delete.
     * @example
     * // Delete a few BonusTypes
     * const { count } = await prisma.bonusType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BonusTypeDeleteManyArgs>(args?: SelectSubset<T, BonusTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BonusTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BonusTypes
     * const bonusType = await prisma.bonusType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BonusTypeUpdateManyArgs>(args: SelectSubset<T, BonusTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BonusTypes and returns the data updated in the database.
     * @param {BonusTypeUpdateManyAndReturnArgs} args - Arguments to update many BonusTypes.
     * @example
     * // Update many BonusTypes
     * const bonusType = await prisma.bonusType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BonusTypes and only return the `id`
     * const bonusTypeWithIdOnly = await prisma.bonusType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BonusTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, BonusTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BonusType.
     * @param {BonusTypeUpsertArgs} args - Arguments to update or create a BonusType.
     * @example
     * // Update or create a BonusType
     * const bonusType = await prisma.bonusType.upsert({
     *   create: {
     *     // ... data to create a BonusType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BonusType we want to update
     *   }
     * })
     */
    upsert<T extends BonusTypeUpsertArgs>(args: SelectSubset<T, BonusTypeUpsertArgs<ExtArgs>>): Prisma__BonusTypeClient<$Result.GetResult<Prisma.$BonusTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BonusTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeCountArgs} args - Arguments to filter BonusTypes to count.
     * @example
     * // Count the number of BonusTypes
     * const count = await prisma.bonusType.count({
     *   where: {
     *     // ... the filter for the BonusTypes we want to count
     *   }
     * })
    **/
    count<T extends BonusTypeCountArgs>(
      args?: Subset<T, BonusTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BonusTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BonusType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BonusTypeAggregateArgs>(args: Subset<T, BonusTypeAggregateArgs>): Prisma.PrismaPromise<GetBonusTypeAggregateType<T>>

    /**
     * Group by BonusType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BonusTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BonusTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BonusTypeGroupByArgs['orderBy'] }
        : { orderBy?: BonusTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BonusTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBonusTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BonusType model
   */
  readonly fields: BonusTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BonusType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BonusTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payments<T extends BonusType$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, BonusType$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaryPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BonusType model
   */
  interface BonusTypeFieldRefs {
    readonly id: FieldRef<"BonusType", 'String'>
    readonly name: FieldRef<"BonusType", 'String'>
    readonly description: FieldRef<"BonusType", 'String'>
    readonly isActive: FieldRef<"BonusType", 'Boolean'>
    readonly createdAt: FieldRef<"BonusType", 'DateTime'>
    readonly updatedAt: FieldRef<"BonusType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BonusType findUnique
   */
  export type BonusTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * Filter, which BonusType to fetch.
     */
    where: BonusTypeWhereUniqueInput
  }

  /**
   * BonusType findUniqueOrThrow
   */
  export type BonusTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * Filter, which BonusType to fetch.
     */
    where: BonusTypeWhereUniqueInput
  }

  /**
   * BonusType findFirst
   */
  export type BonusTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * Filter, which BonusType to fetch.
     */
    where?: BonusTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BonusTypes to fetch.
     */
    orderBy?: BonusTypeOrderByWithRelationInput | BonusTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BonusTypes.
     */
    cursor?: BonusTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BonusTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BonusTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BonusTypes.
     */
    distinct?: BonusTypeScalarFieldEnum | BonusTypeScalarFieldEnum[]
  }

  /**
   * BonusType findFirstOrThrow
   */
  export type BonusTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * Filter, which BonusType to fetch.
     */
    where?: BonusTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BonusTypes to fetch.
     */
    orderBy?: BonusTypeOrderByWithRelationInput | BonusTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BonusTypes.
     */
    cursor?: BonusTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BonusTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BonusTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BonusTypes.
     */
    distinct?: BonusTypeScalarFieldEnum | BonusTypeScalarFieldEnum[]
  }

  /**
   * BonusType findMany
   */
  export type BonusTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * Filter, which BonusTypes to fetch.
     */
    where?: BonusTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BonusTypes to fetch.
     */
    orderBy?: BonusTypeOrderByWithRelationInput | BonusTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BonusTypes.
     */
    cursor?: BonusTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BonusTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BonusTypes.
     */
    skip?: number
    distinct?: BonusTypeScalarFieldEnum | BonusTypeScalarFieldEnum[]
  }

  /**
   * BonusType create
   */
  export type BonusTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a BonusType.
     */
    data: XOR<BonusTypeCreateInput, BonusTypeUncheckedCreateInput>
  }

  /**
   * BonusType createMany
   */
  export type BonusTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BonusTypes.
     */
    data: BonusTypeCreateManyInput | BonusTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BonusType createManyAndReturn
   */
  export type BonusTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * The data used to create many BonusTypes.
     */
    data: BonusTypeCreateManyInput | BonusTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BonusType update
   */
  export type BonusTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a BonusType.
     */
    data: XOR<BonusTypeUpdateInput, BonusTypeUncheckedUpdateInput>
    /**
     * Choose, which BonusType to update.
     */
    where: BonusTypeWhereUniqueInput
  }

  /**
   * BonusType updateMany
   */
  export type BonusTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BonusTypes.
     */
    data: XOR<BonusTypeUpdateManyMutationInput, BonusTypeUncheckedUpdateManyInput>
    /**
     * Filter which BonusTypes to update
     */
    where?: BonusTypeWhereInput
    /**
     * Limit how many BonusTypes to update.
     */
    limit?: number
  }

  /**
   * BonusType updateManyAndReturn
   */
  export type BonusTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * The data used to update BonusTypes.
     */
    data: XOR<BonusTypeUpdateManyMutationInput, BonusTypeUncheckedUpdateManyInput>
    /**
     * Filter which BonusTypes to update
     */
    where?: BonusTypeWhereInput
    /**
     * Limit how many BonusTypes to update.
     */
    limit?: number
  }

  /**
   * BonusType upsert
   */
  export type BonusTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the BonusType to update in case it exists.
     */
    where: BonusTypeWhereUniqueInput
    /**
     * In case the BonusType found by the `where` argument doesn't exist, create a new BonusType with this data.
     */
    create: XOR<BonusTypeCreateInput, BonusTypeUncheckedCreateInput>
    /**
     * In case the BonusType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BonusTypeUpdateInput, BonusTypeUncheckedUpdateInput>
  }

  /**
   * BonusType delete
   */
  export type BonusTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
    /**
     * Filter which BonusType to delete.
     */
    where: BonusTypeWhereUniqueInput
  }

  /**
   * BonusType deleteMany
   */
  export type BonusTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BonusTypes to delete
     */
    where?: BonusTypeWhereInput
    /**
     * Limit how many BonusTypes to delete.
     */
    limit?: number
  }

  /**
   * BonusType.payments
   */
  export type BonusType$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaryPayment
     */
    select?: SalaryPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalaryPayment
     */
    omit?: SalaryPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaryPaymentInclude<ExtArgs> | null
    where?: SalaryPaymentWhereInput
    orderBy?: SalaryPaymentOrderByWithRelationInput | SalaryPaymentOrderByWithRelationInput[]
    cursor?: SalaryPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalaryPaymentScalarFieldEnum | SalaryPaymentScalarFieldEnum[]
  }

  /**
   * BonusType without action
   */
  export type BonusTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BonusType
     */
    select?: BonusTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BonusType
     */
    omit?: BonusTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BonusTypeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    invoiceNumber: 'invoiceNumber',
    invoiceDate: 'invoiceDate',
    dueDate: 'dueDate',
    amount: 'amount',
    taxRate: 'taxRate',
    taxAmount: 'taxAmount',
    totalAmount: 'totalAmount',
    isPaid: 'isPaid',
    paymentDate: 'paymentDate',
    status: 'status',
    type: 'type',
    notes: 'notes',
    customerId: 'customerId',
    supplierId: 'supplierId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    issuerAddress: 'issuerAddress',
    issuerName: 'issuerName',
    issuerTaxId: 'issuerTaxId',
    recipientAddress: 'recipientAddress',
    recipientName: 'recipientName',
    recipientTaxId: 'recipientTaxId'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const InvoiceItemScalarFieldEnum: {
    id: 'id',
    description: 'description',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    vatRate: 'vatRate',
    vatAmount: 'vatAmount',
    totalAmount: 'totalAmount',
    invoiceId: 'invoiceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceItemScalarFieldEnum = (typeof InvoiceItemScalarFieldEnum)[keyof typeof InvoiceItemScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    name: 'name',
    taxNumber: 'taxNumber',
    taxOffice: 'taxOffice',
    address: 'address',
    phone: 'phone',
    email: 'email',
    isCustomer: 'isCustomer',
    isSupplier: 'isSupplier',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    amount: 'amount',
    expenseDate: 'expenseDate',
    category: 'category',
    paymentMethod: 'paymentMethod',
    status: 'status',
    receiptUrl: 'receiptUrl',
    supplierId: 'supplierId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const InvoiceFileScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    fileKey: 'fileKey',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    uploadDate: 'uploadDate',
    invoiceId: 'invoiceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceFileScalarFieldEnum = (typeof InvoiceFileScalarFieldEnum)[keyof typeof InvoiceFileScalarFieldEnum]


  export const RecurringTransactionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    amount: 'amount',
    type: 'type',
    category: 'category',
    paymentMethod: 'paymentMethod',
    startDate: 'startDate',
    endDate: 'endDate',
    frequency: 'frequency',
    dayOfMonth: 'dayOfMonth',
    dayOfWeek: 'dayOfWeek',
    isActive: 'isActive',
    lastProcessed: 'lastProcessed',
    contactId: 'contactId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecurringTransactionScalarFieldEnum = (typeof RecurringTransactionScalarFieldEnum)[keyof typeof RecurringTransactionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    position: 'position',
    department: 'department',
    startDate: 'startDate',
    email: 'email',
    phone: 'phone',
    address: 'address',
    taxId: 'taxId',
    socialSecurityNumber: 'socialSecurityNumber',
    bankAccount: 'bankAccount',
    salary: 'salary',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const SalaryPaymentScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    paymentDate: 'paymentDate',
    amount: 'amount',
    type: 'type',
    taxAmount: 'taxAmount',
    netAmount: 'netAmount',
    notes: 'notes',
    paymentMethod: 'paymentMethod',
    status: 'status',
    bonusTypeId: 'bonusTypeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SalaryPaymentScalarFieldEnum = (typeof SalaryPaymentScalarFieldEnum)[keyof typeof SalaryPaymentScalarFieldEnum]


  export const LeaveRequestScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    startDate: 'startDate',
    endDate: 'endDate',
    days: 'days',
    type: 'type',
    status: 'status',
    notes: 'notes',
    approvedAt: 'approvedAt',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeaveRequestScalarFieldEnum = (typeof LeaveRequestScalarFieldEnum)[keyof typeof LeaveRequestScalarFieldEnum]


  export const EmployeeDocumentScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    title: 'title',
    fileKey: 'fileKey',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    uploadDate: 'uploadDate',
    category: 'category',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeDocumentScalarFieldEnum = (typeof EmployeeDocumentScalarFieldEnum)[keyof typeof EmployeeDocumentScalarFieldEnum]


  export const EmployeeLeaveBalanceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    year: 'year',
    annualLeaveTotal: 'annualLeaveTotal',
    annualLeaveUsed: 'annualLeaveUsed',
    sickLeaveTotal: 'sickLeaveTotal',
    sickLeaveUsed: 'sickLeaveUsed',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeLeaveBalanceScalarFieldEnum = (typeof EmployeeLeaveBalanceScalarFieldEnum)[keyof typeof EmployeeLeaveBalanceScalarFieldEnum]


  export const BonusTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BonusTypeScalarFieldEnum = (typeof BonusTypeScalarFieldEnum)[keyof typeof BonusTypeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EmployeeStatus'
   */
  export type EnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus'>
    


  /**
   * Reference to a field of type 'EmployeeStatus[]'
   */
  export type ListEnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus[]'>
    


  /**
   * Reference to a field of type 'SalaryPaymentType'
   */
  export type EnumSalaryPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SalaryPaymentType'>
    


  /**
   * Reference to a field of type 'SalaryPaymentType[]'
   */
  export type ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SalaryPaymentType[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'LeaveType'
   */
  export type EnumLeaveTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveType'>
    


  /**
   * Reference to a field of type 'LeaveType[]'
   */
  export type ListEnumLeaveTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveType[]'>
    


  /**
   * Reference to a field of type 'LeaveStatus'
   */
  export type EnumLeaveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveStatus'>
    


  /**
   * Reference to a field of type 'LeaveStatus[]'
   */
  export type ListEnumLeaveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    amount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxRate?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxAmount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFilter<"Invoice"> | boolean
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    status?: StringFilter<"Invoice"> | string
    type?: StringNullableFilter<"Invoice"> | string | null
    notes?: StringNullableFilter<"Invoice"> | string | null
    customerId?: StringNullableFilter<"Invoice"> | string | null
    supplierId?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    issuerAddress?: StringNullableFilter<"Invoice"> | string | null
    issuerName?: StringNullableFilter<"Invoice"> | string | null
    issuerTaxId?: StringNullableFilter<"Invoice"> | string | null
    recipientAddress?: StringNullableFilter<"Invoice"> | string | null
    recipientName?: StringNullableFilter<"Invoice"> | string | null
    recipientTaxId?: StringNullableFilter<"Invoice"> | string | null
    customer?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    Contact_Invoice_supplierIdToContact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    InvoiceFile?: InvoiceFileListRelationFilter
    items?: InvoiceItemListRelationFilter
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    taxRate?: SortOrderInput | SortOrder
    taxAmount?: SortOrderInput | SortOrder
    totalAmount?: SortOrder
    isPaid?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    customerId?: SortOrderInput | SortOrder
    supplierId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    issuerAddress?: SortOrderInput | SortOrder
    issuerName?: SortOrderInput | SortOrder
    issuerTaxId?: SortOrderInput | SortOrder
    recipientAddress?: SortOrderInput | SortOrder
    recipientName?: SortOrderInput | SortOrder
    recipientTaxId?: SortOrderInput | SortOrder
    customer?: ContactOrderByWithRelationInput
    Contact_Invoice_supplierIdToContact?: ContactOrderByWithRelationInput
    InvoiceFile?: InvoiceFileOrderByRelationAggregateInput
    items?: InvoiceItemOrderByRelationAggregateInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    invoiceNumber?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    amount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxRate?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxAmount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFilter<"Invoice"> | boolean
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    status?: StringFilter<"Invoice"> | string
    type?: StringNullableFilter<"Invoice"> | string | null
    notes?: StringNullableFilter<"Invoice"> | string | null
    customerId?: StringNullableFilter<"Invoice"> | string | null
    supplierId?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    issuerAddress?: StringNullableFilter<"Invoice"> | string | null
    issuerName?: StringNullableFilter<"Invoice"> | string | null
    issuerTaxId?: StringNullableFilter<"Invoice"> | string | null
    recipientAddress?: StringNullableFilter<"Invoice"> | string | null
    recipientName?: StringNullableFilter<"Invoice"> | string | null
    recipientTaxId?: StringNullableFilter<"Invoice"> | string | null
    customer?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    Contact_Invoice_supplierIdToContact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
    InvoiceFile?: InvoiceFileListRelationFilter
    items?: InvoiceItemListRelationFilter
  }, "id">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    taxRate?: SortOrderInput | SortOrder
    taxAmount?: SortOrderInput | SortOrder
    totalAmount?: SortOrder
    isPaid?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    customerId?: SortOrderInput | SortOrder
    supplierId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    issuerAddress?: SortOrderInput | SortOrder
    issuerName?: SortOrderInput | SortOrder
    issuerTaxId?: SortOrderInput | SortOrder
    recipientAddress?: SortOrderInput | SortOrder
    recipientName?: SortOrderInput | SortOrder
    recipientTaxId?: SortOrderInput | SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceNumber?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    amount?: DecimalNullableWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxRate?: DecimalNullableWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxAmount?: DecimalNullableWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    isPaid?: BoolWithAggregatesFilter<"Invoice"> | boolean
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    status?: StringWithAggregatesFilter<"Invoice"> | string
    type?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    customerId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    supplierId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    issuerAddress?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    issuerName?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    issuerTaxId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    recipientAddress?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    recipientName?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    recipientTaxId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
  }

  export type InvoiceItemWhereInput = {
    AND?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    OR?: InvoiceItemWhereInput[]
    NOT?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    id?: StringFilter<"InvoiceItem"> | string
    description?: StringFilter<"InvoiceItem"> | string
    quantity?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    invoiceId?: StringFilter<"InvoiceItem"> | string
    createdAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
  }

  export type InvoiceItemOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoice?: InvoiceOrderByWithRelationInput
  }

  export type InvoiceItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    OR?: InvoiceItemWhereInput[]
    NOT?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    description?: StringFilter<"InvoiceItem"> | string
    quantity?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    invoiceId?: StringFilter<"InvoiceItem"> | string
    createdAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
  }, "id">

  export type InvoiceItemOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceItemCountOrderByAggregateInput
    _avg?: InvoiceItemAvgOrderByAggregateInput
    _max?: InvoiceItemMaxOrderByAggregateInput
    _min?: InvoiceItemMinOrderByAggregateInput
    _sum?: InvoiceItemSumOrderByAggregateInput
  }

  export type InvoiceItemScalarWhereWithAggregatesInput = {
    AND?: InvoiceItemScalarWhereWithAggregatesInput | InvoiceItemScalarWhereWithAggregatesInput[]
    OR?: InvoiceItemScalarWhereWithAggregatesInput[]
    NOT?: InvoiceItemScalarWhereWithAggregatesInput | InvoiceItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InvoiceItem"> | string
    description?: StringWithAggregatesFilter<"InvoiceItem"> | string
    quantity?: DecimalWithAggregatesFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalWithAggregatesFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalWithAggregatesFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalWithAggregatesFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalWithAggregatesFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    invoiceId?: StringWithAggregatesFilter<"InvoiceItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InvoiceItem"> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    name?: StringFilter<"Contact"> | string
    taxNumber?: StringNullableFilter<"Contact"> | string | null
    taxOffice?: StringNullableFilter<"Contact"> | string | null
    address?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    isCustomer?: BoolFilter<"Contact"> | boolean
    isSupplier?: BoolFilter<"Contact"> | boolean
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    Expense?: ExpenseListRelationFilter
    invoices?: InvoiceListRelationFilter
    Invoice_Invoice_supplierIdToContact?: InvoiceListRelationFilter
    RecurringTransaction?: RecurringTransactionListRelationFilter
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    taxNumber?: SortOrderInput | SortOrder
    taxOffice?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    isCustomer?: SortOrder
    isSupplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Expense?: ExpenseOrderByRelationAggregateInput
    invoices?: InvoiceOrderByRelationAggregateInput
    Invoice_Invoice_supplierIdToContact?: InvoiceOrderByRelationAggregateInput
    RecurringTransaction?: RecurringTransactionOrderByRelationAggregateInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    name?: StringFilter<"Contact"> | string
    taxNumber?: StringNullableFilter<"Contact"> | string | null
    taxOffice?: StringNullableFilter<"Contact"> | string | null
    address?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    isCustomer?: BoolFilter<"Contact"> | boolean
    isSupplier?: BoolFilter<"Contact"> | boolean
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    Expense?: ExpenseListRelationFilter
    invoices?: InvoiceListRelationFilter
    Invoice_Invoice_supplierIdToContact?: InvoiceListRelationFilter
    RecurringTransaction?: RecurringTransactionListRelationFilter
  }, "id">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    taxNumber?: SortOrderInput | SortOrder
    taxOffice?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    isCustomer?: SortOrder
    isSupplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    name?: StringWithAggregatesFilter<"Contact"> | string
    taxNumber?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    taxOffice?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    address?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    email?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    isCustomer?: BoolWithAggregatesFilter<"Contact"> | boolean
    isSupplier?: BoolWithAggregatesFilter<"Contact"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: StringFilter<"Expense"> | string
    title?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    category?: StringFilter<"Expense"> | string
    paymentMethod?: StringFilter<"Expense"> | string
    status?: StringFilter<"Expense"> | string
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    supplierId?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    Contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    supplierId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Contact?: ContactOrderByWithRelationInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    title?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    category?: StringFilter<"Expense"> | string
    paymentMethod?: StringFilter<"Expense"> | string
    status?: StringFilter<"Expense"> | string
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    supplierId?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    Contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    supplierId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expense"> | string
    title?: StringWithAggregatesFilter<"Expense"> | string
    description?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    amount?: DecimalWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    category?: StringWithAggregatesFilter<"Expense"> | string
    paymentMethod?: StringWithAggregatesFilter<"Expense"> | string
    status?: StringWithAggregatesFilter<"Expense"> | string
    receiptUrl?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    supplierId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
  }

  export type InvoiceFileWhereInput = {
    AND?: InvoiceFileWhereInput | InvoiceFileWhereInput[]
    OR?: InvoiceFileWhereInput[]
    NOT?: InvoiceFileWhereInput | InvoiceFileWhereInput[]
    id?: StringFilter<"InvoiceFile"> | string
    filename?: StringFilter<"InvoiceFile"> | string
    fileKey?: StringFilter<"InvoiceFile"> | string
    fileSize?: IntFilter<"InvoiceFile"> | number
    mimeType?: StringFilter<"InvoiceFile"> | string
    uploadDate?: DateTimeFilter<"InvoiceFile"> | Date | string
    invoiceId?: StringFilter<"InvoiceFile"> | string
    createdAt?: DateTimeFilter<"InvoiceFile"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceFile"> | Date | string
    Invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
  }

  export type InvoiceFileOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Invoice?: InvoiceOrderByWithRelationInput
  }

  export type InvoiceFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceFileWhereInput | InvoiceFileWhereInput[]
    OR?: InvoiceFileWhereInput[]
    NOT?: InvoiceFileWhereInput | InvoiceFileWhereInput[]
    filename?: StringFilter<"InvoiceFile"> | string
    fileKey?: StringFilter<"InvoiceFile"> | string
    fileSize?: IntFilter<"InvoiceFile"> | number
    mimeType?: StringFilter<"InvoiceFile"> | string
    uploadDate?: DateTimeFilter<"InvoiceFile"> | Date | string
    invoiceId?: StringFilter<"InvoiceFile"> | string
    createdAt?: DateTimeFilter<"InvoiceFile"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceFile"> | Date | string
    Invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
  }, "id">

  export type InvoiceFileOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceFileCountOrderByAggregateInput
    _avg?: InvoiceFileAvgOrderByAggregateInput
    _max?: InvoiceFileMaxOrderByAggregateInput
    _min?: InvoiceFileMinOrderByAggregateInput
    _sum?: InvoiceFileSumOrderByAggregateInput
  }

  export type InvoiceFileScalarWhereWithAggregatesInput = {
    AND?: InvoiceFileScalarWhereWithAggregatesInput | InvoiceFileScalarWhereWithAggregatesInput[]
    OR?: InvoiceFileScalarWhereWithAggregatesInput[]
    NOT?: InvoiceFileScalarWhereWithAggregatesInput | InvoiceFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InvoiceFile"> | string
    filename?: StringWithAggregatesFilter<"InvoiceFile"> | string
    fileKey?: StringWithAggregatesFilter<"InvoiceFile"> | string
    fileSize?: IntWithAggregatesFilter<"InvoiceFile"> | number
    mimeType?: StringWithAggregatesFilter<"InvoiceFile"> | string
    uploadDate?: DateTimeWithAggregatesFilter<"InvoiceFile"> | Date | string
    invoiceId?: StringWithAggregatesFilter<"InvoiceFile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InvoiceFile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InvoiceFile"> | Date | string
  }

  export type RecurringTransactionWhereInput = {
    AND?: RecurringTransactionWhereInput | RecurringTransactionWhereInput[]
    OR?: RecurringTransactionWhereInput[]
    NOT?: RecurringTransactionWhereInput | RecurringTransactionWhereInput[]
    id?: StringFilter<"RecurringTransaction"> | string
    title?: StringFilter<"RecurringTransaction"> | string
    description?: StringNullableFilter<"RecurringTransaction"> | string | null
    amount?: DecimalFilter<"RecurringTransaction"> | Decimal | DecimalJsLike | number | string
    type?: StringFilter<"RecurringTransaction"> | string
    category?: StringFilter<"RecurringTransaction"> | string
    paymentMethod?: StringNullableFilter<"RecurringTransaction"> | string | null
    startDate?: DateTimeFilter<"RecurringTransaction"> | Date | string
    endDate?: DateTimeNullableFilter<"RecurringTransaction"> | Date | string | null
    frequency?: StringFilter<"RecurringTransaction"> | string
    dayOfMonth?: IntNullableFilter<"RecurringTransaction"> | number | null
    dayOfWeek?: IntNullableFilter<"RecurringTransaction"> | number | null
    isActive?: BoolFilter<"RecurringTransaction"> | boolean
    lastProcessed?: DateTimeNullableFilter<"RecurringTransaction"> | Date | string | null
    contactId?: StringNullableFilter<"RecurringTransaction"> | string | null
    createdAt?: DateTimeFilter<"RecurringTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"RecurringTransaction"> | Date | string
    Contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
  }

  export type RecurringTransactionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    type?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    frequency?: SortOrder
    dayOfMonth?: SortOrderInput | SortOrder
    dayOfWeek?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastProcessed?: SortOrderInput | SortOrder
    contactId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Contact?: ContactOrderByWithRelationInput
  }

  export type RecurringTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecurringTransactionWhereInput | RecurringTransactionWhereInput[]
    OR?: RecurringTransactionWhereInput[]
    NOT?: RecurringTransactionWhereInput | RecurringTransactionWhereInput[]
    title?: StringFilter<"RecurringTransaction"> | string
    description?: StringNullableFilter<"RecurringTransaction"> | string | null
    amount?: DecimalFilter<"RecurringTransaction"> | Decimal | DecimalJsLike | number | string
    type?: StringFilter<"RecurringTransaction"> | string
    category?: StringFilter<"RecurringTransaction"> | string
    paymentMethod?: StringNullableFilter<"RecurringTransaction"> | string | null
    startDate?: DateTimeFilter<"RecurringTransaction"> | Date | string
    endDate?: DateTimeNullableFilter<"RecurringTransaction"> | Date | string | null
    frequency?: StringFilter<"RecurringTransaction"> | string
    dayOfMonth?: IntNullableFilter<"RecurringTransaction"> | number | null
    dayOfWeek?: IntNullableFilter<"RecurringTransaction"> | number | null
    isActive?: BoolFilter<"RecurringTransaction"> | boolean
    lastProcessed?: DateTimeNullableFilter<"RecurringTransaction"> | Date | string | null
    contactId?: StringNullableFilter<"RecurringTransaction"> | string | null
    createdAt?: DateTimeFilter<"RecurringTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"RecurringTransaction"> | Date | string
    Contact?: XOR<ContactNullableScalarRelationFilter, ContactWhereInput> | null
  }, "id">

  export type RecurringTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    type?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    frequency?: SortOrder
    dayOfMonth?: SortOrderInput | SortOrder
    dayOfWeek?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastProcessed?: SortOrderInput | SortOrder
    contactId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecurringTransactionCountOrderByAggregateInput
    _avg?: RecurringTransactionAvgOrderByAggregateInput
    _max?: RecurringTransactionMaxOrderByAggregateInput
    _min?: RecurringTransactionMinOrderByAggregateInput
    _sum?: RecurringTransactionSumOrderByAggregateInput
  }

  export type RecurringTransactionScalarWhereWithAggregatesInput = {
    AND?: RecurringTransactionScalarWhereWithAggregatesInput | RecurringTransactionScalarWhereWithAggregatesInput[]
    OR?: RecurringTransactionScalarWhereWithAggregatesInput[]
    NOT?: RecurringTransactionScalarWhereWithAggregatesInput | RecurringTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecurringTransaction"> | string
    title?: StringWithAggregatesFilter<"RecurringTransaction"> | string
    description?: StringNullableWithAggregatesFilter<"RecurringTransaction"> | string | null
    amount?: DecimalWithAggregatesFilter<"RecurringTransaction"> | Decimal | DecimalJsLike | number | string
    type?: StringWithAggregatesFilter<"RecurringTransaction"> | string
    category?: StringWithAggregatesFilter<"RecurringTransaction"> | string
    paymentMethod?: StringNullableWithAggregatesFilter<"RecurringTransaction"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"RecurringTransaction"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"RecurringTransaction"> | Date | string | null
    frequency?: StringWithAggregatesFilter<"RecurringTransaction"> | string
    dayOfMonth?: IntNullableWithAggregatesFilter<"RecurringTransaction"> | number | null
    dayOfWeek?: IntNullableWithAggregatesFilter<"RecurringTransaction"> | number | null
    isActive?: BoolWithAggregatesFilter<"RecurringTransaction"> | boolean
    lastProcessed?: DateTimeNullableWithAggregatesFilter<"RecurringTransaction"> | Date | string | null
    contactId?: StringNullableWithAggregatesFilter<"RecurringTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RecurringTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecurringTransaction"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    position?: StringFilter<"Employee"> | string
    department?: StringFilter<"Employee"> | string
    startDate?: DateTimeFilter<"Employee"> | Date | string
    email?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    taxId?: StringNullableFilter<"Employee"> | string | null
    socialSecurityNumber?: StringNullableFilter<"Employee"> | string | null
    bankAccount?: StringNullableFilter<"Employee"> | string | null
    salary?: DecimalFilter<"Employee"> | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    salaryPayments?: SalaryPaymentListRelationFilter
    leaveRequests?: LeaveRequestListRelationFilter
    documents?: EmployeeDocumentListRelationFilter
    leaveBalance?: XOR<EmployeeLeaveBalanceNullableScalarRelationFilter, EmployeeLeaveBalanceWhereInput> | null
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    department?: SortOrder
    startDate?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    taxId?: SortOrderInput | SortOrder
    socialSecurityNumber?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    salary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    salaryPayments?: SalaryPaymentOrderByRelationAggregateInput
    leaveRequests?: LeaveRequestOrderByRelationAggregateInput
    documents?: EmployeeDocumentOrderByRelationAggregateInput
    leaveBalance?: EmployeeLeaveBalanceOrderByWithRelationInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    name?: StringFilter<"Employee"> | string
    position?: StringFilter<"Employee"> | string
    department?: StringFilter<"Employee"> | string
    startDate?: DateTimeFilter<"Employee"> | Date | string
    email?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    taxId?: StringNullableFilter<"Employee"> | string | null
    socialSecurityNumber?: StringNullableFilter<"Employee"> | string | null
    bankAccount?: StringNullableFilter<"Employee"> | string | null
    salary?: DecimalFilter<"Employee"> | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    salaryPayments?: SalaryPaymentListRelationFilter
    leaveRequests?: LeaveRequestListRelationFilter
    documents?: EmployeeDocumentListRelationFilter
    leaveBalance?: XOR<EmployeeLeaveBalanceNullableScalarRelationFilter, EmployeeLeaveBalanceWhereInput> | null
  }, "id">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    department?: SortOrder
    startDate?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    taxId?: SortOrderInput | SortOrder
    socialSecurityNumber?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    salary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _avg?: EmployeeAvgOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
    _sum?: EmployeeSumOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    name?: StringWithAggregatesFilter<"Employee"> | string
    position?: StringWithAggregatesFilter<"Employee"> | string
    department?: StringWithAggregatesFilter<"Employee"> | string
    startDate?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    email?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    address?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    taxId?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    socialSecurityNumber?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    bankAccount?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    salary?: DecimalWithAggregatesFilter<"Employee"> | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusWithAggregatesFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type SalaryPaymentWhereInput = {
    AND?: SalaryPaymentWhereInput | SalaryPaymentWhereInput[]
    OR?: SalaryPaymentWhereInput[]
    NOT?: SalaryPaymentWhereInput | SalaryPaymentWhereInput[]
    id?: StringFilter<"SalaryPayment"> | string
    employeeId?: StringFilter<"SalaryPayment"> | string
    paymentDate?: DateTimeFilter<"SalaryPayment"> | Date | string
    amount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFilter<"SalaryPayment"> | $Enums.SalaryPaymentType
    taxAmount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"SalaryPayment"> | string | null
    paymentMethod?: StringNullableFilter<"SalaryPayment"> | string | null
    status?: EnumPaymentStatusFilter<"SalaryPayment"> | $Enums.PaymentStatus
    bonusTypeId?: StringNullableFilter<"SalaryPayment"> | string | null
    createdAt?: DateTimeFilter<"SalaryPayment"> | Date | string
    updatedAt?: DateTimeFilter<"SalaryPayment"> | Date | string
    bonusType?: XOR<BonusTypeNullableScalarRelationFilter, BonusTypeWhereInput> | null
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type SalaryPaymentOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    paymentDate?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    status?: SortOrder
    bonusTypeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bonusType?: BonusTypeOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
  }

  export type SalaryPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SalaryPaymentWhereInput | SalaryPaymentWhereInput[]
    OR?: SalaryPaymentWhereInput[]
    NOT?: SalaryPaymentWhereInput | SalaryPaymentWhereInput[]
    employeeId?: StringFilter<"SalaryPayment"> | string
    paymentDate?: DateTimeFilter<"SalaryPayment"> | Date | string
    amount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFilter<"SalaryPayment"> | $Enums.SalaryPaymentType
    taxAmount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"SalaryPayment"> | string | null
    paymentMethod?: StringNullableFilter<"SalaryPayment"> | string | null
    status?: EnumPaymentStatusFilter<"SalaryPayment"> | $Enums.PaymentStatus
    bonusTypeId?: StringNullableFilter<"SalaryPayment"> | string | null
    createdAt?: DateTimeFilter<"SalaryPayment"> | Date | string
    updatedAt?: DateTimeFilter<"SalaryPayment"> | Date | string
    bonusType?: XOR<BonusTypeNullableScalarRelationFilter, BonusTypeWhereInput> | null
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type SalaryPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    paymentDate?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    status?: SortOrder
    bonusTypeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SalaryPaymentCountOrderByAggregateInput
    _avg?: SalaryPaymentAvgOrderByAggregateInput
    _max?: SalaryPaymentMaxOrderByAggregateInput
    _min?: SalaryPaymentMinOrderByAggregateInput
    _sum?: SalaryPaymentSumOrderByAggregateInput
  }

  export type SalaryPaymentScalarWhereWithAggregatesInput = {
    AND?: SalaryPaymentScalarWhereWithAggregatesInput | SalaryPaymentScalarWhereWithAggregatesInput[]
    OR?: SalaryPaymentScalarWhereWithAggregatesInput[]
    NOT?: SalaryPaymentScalarWhereWithAggregatesInput | SalaryPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SalaryPayment"> | string
    employeeId?: StringWithAggregatesFilter<"SalaryPayment"> | string
    paymentDate?: DateTimeWithAggregatesFilter<"SalaryPayment"> | Date | string
    amount?: DecimalWithAggregatesFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeWithAggregatesFilter<"SalaryPayment"> | $Enums.SalaryPaymentType
    taxAmount?: DecimalWithAggregatesFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalWithAggregatesFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableWithAggregatesFilter<"SalaryPayment"> | string | null
    paymentMethod?: StringNullableWithAggregatesFilter<"SalaryPayment"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"SalaryPayment"> | $Enums.PaymentStatus
    bonusTypeId?: StringNullableWithAggregatesFilter<"SalaryPayment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SalaryPayment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SalaryPayment"> | Date | string
  }

  export type LeaveRequestWhereInput = {
    AND?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    OR?: LeaveRequestWhereInput[]
    NOT?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    id?: StringFilter<"LeaveRequest"> | string
    employeeId?: StringFilter<"LeaveRequest"> | string
    startDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    days?: IntFilter<"LeaveRequest"> | number
    type?: EnumLeaveTypeFilter<"LeaveRequest"> | $Enums.LeaveType
    status?: EnumLeaveStatusFilter<"LeaveRequest"> | $Enums.LeaveStatus
    notes?: StringNullableFilter<"LeaveRequest"> | string | null
    approvedAt?: DateTimeNullableFilter<"LeaveRequest"> | Date | string | null
    approvedBy?: StringNullableFilter<"LeaveRequest"> | string | null
    createdAt?: DateTimeFilter<"LeaveRequest"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveRequest"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type LeaveRequestOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    days?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type LeaveRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    OR?: LeaveRequestWhereInput[]
    NOT?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    employeeId?: StringFilter<"LeaveRequest"> | string
    startDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    days?: IntFilter<"LeaveRequest"> | number
    type?: EnumLeaveTypeFilter<"LeaveRequest"> | $Enums.LeaveType
    status?: EnumLeaveStatusFilter<"LeaveRequest"> | $Enums.LeaveStatus
    notes?: StringNullableFilter<"LeaveRequest"> | string | null
    approvedAt?: DateTimeNullableFilter<"LeaveRequest"> | Date | string | null
    approvedBy?: StringNullableFilter<"LeaveRequest"> | string | null
    createdAt?: DateTimeFilter<"LeaveRequest"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveRequest"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type LeaveRequestOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    days?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeaveRequestCountOrderByAggregateInput
    _avg?: LeaveRequestAvgOrderByAggregateInput
    _max?: LeaveRequestMaxOrderByAggregateInput
    _min?: LeaveRequestMinOrderByAggregateInput
    _sum?: LeaveRequestSumOrderByAggregateInput
  }

  export type LeaveRequestScalarWhereWithAggregatesInput = {
    AND?: LeaveRequestScalarWhereWithAggregatesInput | LeaveRequestScalarWhereWithAggregatesInput[]
    OR?: LeaveRequestScalarWhereWithAggregatesInput[]
    NOT?: LeaveRequestScalarWhereWithAggregatesInput | LeaveRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveRequest"> | string
    employeeId?: StringWithAggregatesFilter<"LeaveRequest"> | string
    startDate?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    days?: IntWithAggregatesFilter<"LeaveRequest"> | number
    type?: EnumLeaveTypeWithAggregatesFilter<"LeaveRequest"> | $Enums.LeaveType
    status?: EnumLeaveStatusWithAggregatesFilter<"LeaveRequest"> | $Enums.LeaveStatus
    notes?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"LeaveRequest"> | Date | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
  }

  export type EmployeeDocumentWhereInput = {
    AND?: EmployeeDocumentWhereInput | EmployeeDocumentWhereInput[]
    OR?: EmployeeDocumentWhereInput[]
    NOT?: EmployeeDocumentWhereInput | EmployeeDocumentWhereInput[]
    id?: StringFilter<"EmployeeDocument"> | string
    employeeId?: StringFilter<"EmployeeDocument"> | string
    title?: StringFilter<"EmployeeDocument"> | string
    fileKey?: StringFilter<"EmployeeDocument"> | string
    fileSize?: IntFilter<"EmployeeDocument"> | number
    mimeType?: StringFilter<"EmployeeDocument"> | string
    uploadDate?: DateTimeFilter<"EmployeeDocument"> | Date | string
    category?: StringFilter<"EmployeeDocument"> | string
    notes?: StringNullableFilter<"EmployeeDocument"> | string | null
    createdAt?: DateTimeFilter<"EmployeeDocument"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeDocument"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmployeeDocumentOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    title?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    category?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmployeeDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeDocumentWhereInput | EmployeeDocumentWhereInput[]
    OR?: EmployeeDocumentWhereInput[]
    NOT?: EmployeeDocumentWhereInput | EmployeeDocumentWhereInput[]
    employeeId?: StringFilter<"EmployeeDocument"> | string
    title?: StringFilter<"EmployeeDocument"> | string
    fileKey?: StringFilter<"EmployeeDocument"> | string
    fileSize?: IntFilter<"EmployeeDocument"> | number
    mimeType?: StringFilter<"EmployeeDocument"> | string
    uploadDate?: DateTimeFilter<"EmployeeDocument"> | Date | string
    category?: StringFilter<"EmployeeDocument"> | string
    notes?: StringNullableFilter<"EmployeeDocument"> | string | null
    createdAt?: DateTimeFilter<"EmployeeDocument"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeDocument"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type EmployeeDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    title?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    category?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeDocumentCountOrderByAggregateInput
    _avg?: EmployeeDocumentAvgOrderByAggregateInput
    _max?: EmployeeDocumentMaxOrderByAggregateInput
    _min?: EmployeeDocumentMinOrderByAggregateInput
    _sum?: EmployeeDocumentSumOrderByAggregateInput
  }

  export type EmployeeDocumentScalarWhereWithAggregatesInput = {
    AND?: EmployeeDocumentScalarWhereWithAggregatesInput | EmployeeDocumentScalarWhereWithAggregatesInput[]
    OR?: EmployeeDocumentScalarWhereWithAggregatesInput[]
    NOT?: EmployeeDocumentScalarWhereWithAggregatesInput | EmployeeDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeDocument"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeDocument"> | string
    title?: StringWithAggregatesFilter<"EmployeeDocument"> | string
    fileKey?: StringWithAggregatesFilter<"EmployeeDocument"> | string
    fileSize?: IntWithAggregatesFilter<"EmployeeDocument"> | number
    mimeType?: StringWithAggregatesFilter<"EmployeeDocument"> | string
    uploadDate?: DateTimeWithAggregatesFilter<"EmployeeDocument"> | Date | string
    category?: StringWithAggregatesFilter<"EmployeeDocument"> | string
    notes?: StringNullableWithAggregatesFilter<"EmployeeDocument"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmployeeDocument"> | Date | string
  }

  export type EmployeeLeaveBalanceWhereInput = {
    AND?: EmployeeLeaveBalanceWhereInput | EmployeeLeaveBalanceWhereInput[]
    OR?: EmployeeLeaveBalanceWhereInput[]
    NOT?: EmployeeLeaveBalanceWhereInput | EmployeeLeaveBalanceWhereInput[]
    id?: StringFilter<"EmployeeLeaveBalance"> | string
    employeeId?: StringFilter<"EmployeeLeaveBalance"> | string
    year?: IntFilter<"EmployeeLeaveBalance"> | number
    annualLeaveTotal?: IntFilter<"EmployeeLeaveBalance"> | number
    annualLeaveUsed?: IntFilter<"EmployeeLeaveBalance"> | number
    sickLeaveTotal?: IntFilter<"EmployeeLeaveBalance"> | number
    sickLeaveUsed?: IntFilter<"EmployeeLeaveBalance"> | number
    lastUpdated?: DateTimeFilter<"EmployeeLeaveBalance"> | Date | string
    createdAt?: DateTimeFilter<"EmployeeLeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeLeaveBalance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmployeeLeaveBalanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmployeeLeaveBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId?: string
    AND?: EmployeeLeaveBalanceWhereInput | EmployeeLeaveBalanceWhereInput[]
    OR?: EmployeeLeaveBalanceWhereInput[]
    NOT?: EmployeeLeaveBalanceWhereInput | EmployeeLeaveBalanceWhereInput[]
    year?: IntFilter<"EmployeeLeaveBalance"> | number
    annualLeaveTotal?: IntFilter<"EmployeeLeaveBalance"> | number
    annualLeaveUsed?: IntFilter<"EmployeeLeaveBalance"> | number
    sickLeaveTotal?: IntFilter<"EmployeeLeaveBalance"> | number
    sickLeaveUsed?: IntFilter<"EmployeeLeaveBalance"> | number
    lastUpdated?: DateTimeFilter<"EmployeeLeaveBalance"> | Date | string
    createdAt?: DateTimeFilter<"EmployeeLeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeLeaveBalance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employeeId">

  export type EmployeeLeaveBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeLeaveBalanceCountOrderByAggregateInput
    _avg?: EmployeeLeaveBalanceAvgOrderByAggregateInput
    _max?: EmployeeLeaveBalanceMaxOrderByAggregateInput
    _min?: EmployeeLeaveBalanceMinOrderByAggregateInput
    _sum?: EmployeeLeaveBalanceSumOrderByAggregateInput
  }

  export type EmployeeLeaveBalanceScalarWhereWithAggregatesInput = {
    AND?: EmployeeLeaveBalanceScalarWhereWithAggregatesInput | EmployeeLeaveBalanceScalarWhereWithAggregatesInput[]
    OR?: EmployeeLeaveBalanceScalarWhereWithAggregatesInput[]
    NOT?: EmployeeLeaveBalanceScalarWhereWithAggregatesInput | EmployeeLeaveBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeLeaveBalance"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeLeaveBalance"> | string
    year?: IntWithAggregatesFilter<"EmployeeLeaveBalance"> | number
    annualLeaveTotal?: IntWithAggregatesFilter<"EmployeeLeaveBalance"> | number
    annualLeaveUsed?: IntWithAggregatesFilter<"EmployeeLeaveBalance"> | number
    sickLeaveTotal?: IntWithAggregatesFilter<"EmployeeLeaveBalance"> | number
    sickLeaveUsed?: IntWithAggregatesFilter<"EmployeeLeaveBalance"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"EmployeeLeaveBalance"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeLeaveBalance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmployeeLeaveBalance"> | Date | string
  }

  export type BonusTypeWhereInput = {
    AND?: BonusTypeWhereInput | BonusTypeWhereInput[]
    OR?: BonusTypeWhereInput[]
    NOT?: BonusTypeWhereInput | BonusTypeWhereInput[]
    id?: StringFilter<"BonusType"> | string
    name?: StringFilter<"BonusType"> | string
    description?: StringNullableFilter<"BonusType"> | string | null
    isActive?: BoolFilter<"BonusType"> | boolean
    createdAt?: DateTimeFilter<"BonusType"> | Date | string
    updatedAt?: DateTimeFilter<"BonusType"> | Date | string
    payments?: SalaryPaymentListRelationFilter
  }

  export type BonusTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payments?: SalaryPaymentOrderByRelationAggregateInput
  }

  export type BonusTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BonusTypeWhereInput | BonusTypeWhereInput[]
    OR?: BonusTypeWhereInput[]
    NOT?: BonusTypeWhereInput | BonusTypeWhereInput[]
    name?: StringFilter<"BonusType"> | string
    description?: StringNullableFilter<"BonusType"> | string | null
    isActive?: BoolFilter<"BonusType"> | boolean
    createdAt?: DateTimeFilter<"BonusType"> | Date | string
    updatedAt?: DateTimeFilter<"BonusType"> | Date | string
    payments?: SalaryPaymentListRelationFilter
  }, "id">

  export type BonusTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BonusTypeCountOrderByAggregateInput
    _max?: BonusTypeMaxOrderByAggregateInput
    _min?: BonusTypeMinOrderByAggregateInput
  }

  export type BonusTypeScalarWhereWithAggregatesInput = {
    AND?: BonusTypeScalarWhereWithAggregatesInput | BonusTypeScalarWhereWithAggregatesInput[]
    OR?: BonusTypeScalarWhereWithAggregatesInput[]
    NOT?: BonusTypeScalarWhereWithAggregatesInput | BonusTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BonusType"> | string
    name?: StringWithAggregatesFilter<"BonusType"> | string
    description?: StringNullableWithAggregatesFilter<"BonusType"> | string | null
    isActive?: BoolWithAggregatesFilter<"BonusType"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BonusType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BonusType"> | Date | string
  }

  export type InvoiceCreateInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    customer?: ContactCreateNestedOneWithoutInvoicesInput
    Contact_Invoice_supplierIdToContact?: ContactCreateNestedOneWithoutInvoice_Invoice_supplierIdToContactInput
    InvoiceFile?: InvoiceFileCreateNestedManyWithoutInvoiceInput
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    customerId?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    InvoiceFile?: InvoiceFileUncheckedCreateNestedManyWithoutInvoiceInput
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: ContactUpdateOneWithoutInvoicesNestedInput
    Contact_Invoice_supplierIdToContact?: ContactUpdateOneWithoutInvoice_Invoice_supplierIdToContactNestedInput
    InvoiceFile?: InvoiceFileUpdateManyWithoutInvoiceNestedInput
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    InvoiceFile?: InvoiceFileUncheckedUpdateManyWithoutInvoiceNestedInput
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceCreateManyInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    customerId?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvoiceItemCreateInput = {
    id?: string
    description: string
    quantity?: Decimal | DecimalJsLike | number | string
    unitPrice: Decimal | DecimalJsLike | number | string
    vatRate?: Decimal | DecimalJsLike | number | string
    vatAmount?: Decimal | DecimalJsLike | number | string
    totalAmount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt: Date | string
    invoice: InvoiceCreateNestedOneWithoutItemsInput
  }

  export type InvoiceItemUncheckedCreateInput = {
    id?: string
    description: string
    quantity?: Decimal | DecimalJsLike | number | string
    unitPrice: Decimal | DecimalJsLike | number | string
    vatRate?: Decimal | DecimalJsLike | number | string
    vatAmount?: Decimal | DecimalJsLike | number | string
    totalAmount: Decimal | DecimalJsLike | number | string
    invoiceId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutItemsNestedInput
  }

  export type InvoiceItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemCreateManyInput = {
    id?: string
    description: string
    quantity?: Decimal | DecimalJsLike | number | string
    unitPrice: Decimal | DecimalJsLike | number | string
    vatRate?: Decimal | DecimalJsLike | number | string
    vatAmount?: Decimal | DecimalJsLike | number | string
    totalAmount: Decimal | DecimalJsLike | number | string
    invoiceId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseCreateNestedManyWithoutContactInput
    invoices?: InvoiceCreateNestedManyWithoutCustomerInput
    Invoice_Invoice_supplierIdToContact?: InvoiceCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
    RecurringTransaction?: RecurringTransactionCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseUncheckedCreateNestedManyWithoutContactInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutCustomerInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
    RecurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUpdateManyWithoutContactNestedInput
    invoices?: InvoiceUpdateManyWithoutCustomerNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
    RecurringTransaction?: RecurringTransactionUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUncheckedUpdateManyWithoutContactNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutCustomerNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
    RecurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutContactNestedInput
  }

  export type ContactCreateManyInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    category: string
    paymentMethod: string
    status?: string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Contact?: ContactCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    category: string
    paymentMethod: string
    status?: string
    receiptUrl?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Contact?: ContactUpdateOneWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    category: string
    paymentMethod: string
    status?: string
    receiptUrl?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceFileCreateInput = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
    Invoice: InvoiceCreateNestedOneWithoutInvoiceFileInput
  }

  export type InvoiceFileUncheckedCreateInput = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    invoiceId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Invoice?: InvoiceUpdateOneRequiredWithoutInvoiceFileNestedInput
  }

  export type InvoiceFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceFileCreateManyInput = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    invoiceId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurringTransactionCreateInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: string
    category: string
    paymentMethod?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    frequency?: string
    dayOfMonth?: number | null
    dayOfWeek?: number | null
    isActive?: boolean
    lastProcessed?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Contact?: ContactCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: string
    category: string
    paymentMethod?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    frequency?: string
    dayOfMonth?: number | null
    dayOfWeek?: number | null
    isActive?: boolean
    lastProcessed?: Date | string | null
    contactId?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type RecurringTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Contact?: ContactUpdateOneWithoutRecurringTransactionNestedInput
  }

  export type RecurringTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contactId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurringTransactionCreateManyInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: string
    category: string
    paymentMethod?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    frequency?: string
    dayOfMonth?: number | null
    dayOfWeek?: number | null
    isActive?: boolean
    lastProcessed?: Date | string | null
    contactId?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type RecurringTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurringTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contactId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name?: string | null
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name?: string | null
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name?: string | null
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentCreateNestedManyWithoutEmployeeInput
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentUncheckedCreateNestedManyWithoutEmployeeInput
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentUncheckedCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUpdateManyWithoutEmployeeNestedInput
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentCreateInput = {
    id?: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bonusType?: BonusTypeCreateNestedOneWithoutPaymentsInput
    employee: EmployeeCreateNestedOneWithoutSalaryPaymentsInput
  }

  export type SalaryPaymentUncheckedCreateInput = {
    id?: string
    employeeId: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    bonusTypeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalaryPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bonusType?: BonusTypeUpdateOneWithoutPaymentsNestedInput
    employee?: EmployeeUpdateOneRequiredWithoutSalaryPaymentsNestedInput
  }

  export type SalaryPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bonusTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentCreateManyInput = {
    id?: string
    employeeId: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    bonusTypeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalaryPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bonusTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestCreateInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    days: number
    type: $Enums.LeaveType
    status?: $Enums.LeaveStatus
    notes?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutLeaveRequestsInput
  }

  export type LeaveRequestUncheckedCreateInput = {
    id?: string
    employeeId: string
    startDate: Date | string
    endDate: Date | string
    days: number
    type: $Enums.LeaveType
    status?: $Enums.LeaveStatus
    notes?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutLeaveRequestsNestedInput
  }

  export type LeaveRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestCreateManyInput = {
    id?: string
    employeeId: string
    startDate: Date | string
    endDate: Date | string
    days: number
    type: $Enums.LeaveType
    status?: $Enums.LeaveStatus
    notes?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeDocumentCreateInput = {
    id?: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    category?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutDocumentsInput
  }

  export type EmployeeDocumentUncheckedCreateInput = {
    id?: string
    employeeId: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    category?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type EmployeeDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeDocumentCreateManyInput = {
    id?: string
    employeeId: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    category?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLeaveBalanceCreateInput = {
    id?: string
    year: number
    annualLeaveTotal?: number
    annualLeaveUsed?: number
    sickLeaveTotal?: number
    sickLeaveUsed?: number
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutLeaveBalanceInput
  }

  export type EmployeeLeaveBalanceUncheckedCreateInput = {
    id?: string
    employeeId: string
    year: number
    annualLeaveTotal?: number
    annualLeaveUsed?: number
    sickLeaveTotal?: number
    sickLeaveUsed?: number
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeLeaveBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    annualLeaveTotal?: IntFieldUpdateOperationsInput | number
    annualLeaveUsed?: IntFieldUpdateOperationsInput | number
    sickLeaveTotal?: IntFieldUpdateOperationsInput | number
    sickLeaveUsed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutLeaveBalanceNestedInput
  }

  export type EmployeeLeaveBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    annualLeaveTotal?: IntFieldUpdateOperationsInput | number
    annualLeaveUsed?: IntFieldUpdateOperationsInput | number
    sickLeaveTotal?: IntFieldUpdateOperationsInput | number
    sickLeaveUsed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLeaveBalanceCreateManyInput = {
    id?: string
    employeeId: string
    year: number
    annualLeaveTotal?: number
    annualLeaveUsed?: number
    sickLeaveTotal?: number
    sickLeaveUsed?: number
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeLeaveBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    annualLeaveTotal?: IntFieldUpdateOperationsInput | number
    annualLeaveUsed?: IntFieldUpdateOperationsInput | number
    sickLeaveTotal?: IntFieldUpdateOperationsInput | number
    sickLeaveUsed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLeaveBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    annualLeaveTotal?: IntFieldUpdateOperationsInput | number
    annualLeaveUsed?: IntFieldUpdateOperationsInput | number
    sickLeaveTotal?: IntFieldUpdateOperationsInput | number
    sickLeaveUsed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BonusTypeCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: SalaryPaymentCreateNestedManyWithoutBonusTypeInput
  }

  export type BonusTypeUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: SalaryPaymentUncheckedCreateNestedManyWithoutBonusTypeInput
  }

  export type BonusTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: SalaryPaymentUpdateManyWithoutBonusTypeNestedInput
  }

  export type BonusTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: SalaryPaymentUncheckedUpdateManyWithoutBonusTypeNestedInput
  }

  export type BonusTypeCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BonusTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BonusTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ContactNullableScalarRelationFilter = {
    is?: ContactWhereInput | null
    isNot?: ContactWhereInput | null
  }

  export type InvoiceFileListRelationFilter = {
    every?: InvoiceFileWhereInput
    some?: InvoiceFileWhereInput
    none?: InvoiceFileWhereInput
  }

  export type InvoiceItemListRelationFilter = {
    every?: InvoiceItemWhereInput
    some?: InvoiceItemWhereInput
    none?: InvoiceItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvoiceFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    isPaid?: SortOrder
    paymentDate?: SortOrder
    status?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    customerId?: SortOrder
    supplierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    issuerAddress?: SortOrder
    issuerName?: SortOrder
    issuerTaxId?: SortOrder
    recipientAddress?: SortOrder
    recipientName?: SortOrder
    recipientTaxId?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    amount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    isPaid?: SortOrder
    paymentDate?: SortOrder
    status?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    customerId?: SortOrder
    supplierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    issuerAddress?: SortOrder
    issuerName?: SortOrder
    issuerTaxId?: SortOrder
    recipientAddress?: SortOrder
    recipientName?: SortOrder
    recipientTaxId?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    isPaid?: SortOrder
    paymentDate?: SortOrder
    status?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    customerId?: SortOrder
    supplierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    issuerAddress?: SortOrder
    issuerName?: SortOrder
    issuerTaxId?: SortOrder
    recipientAddress?: SortOrder
    recipientName?: SortOrder
    recipientTaxId?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    amount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type InvoiceScalarRelationFilter = {
    is?: InvoiceWhereInput
    isNot?: InvoiceWhereInput
  }

  export type InvoiceItemCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type InvoiceItemMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceItemMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    vatRate?: SortOrder
    vatAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type RecurringTransactionListRelationFilter = {
    every?: RecurringTransactionWhereInput
    some?: RecurringTransactionWhereInput
    none?: RecurringTransactionWhereInput
  }

  export type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecurringTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    taxNumber?: SortOrder
    taxOffice?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    isCustomer?: SortOrder
    isSupplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    taxNumber?: SortOrder
    taxOffice?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    isCustomer?: SortOrder
    isSupplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    taxNumber?: SortOrder
    taxOffice?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    isCustomer?: SortOrder
    isSupplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    supplierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    supplierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    supplierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type InvoiceFileCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceFileAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type InvoiceFileMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceFileMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceFileSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type RecurringTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    frequency?: SortOrder
    dayOfMonth?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    lastProcessed?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecurringTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    dayOfMonth?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type RecurringTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    frequency?: SortOrder
    dayOfMonth?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    lastProcessed?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecurringTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    frequency?: SortOrder
    dayOfMonth?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    lastProcessed?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecurringTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    dayOfMonth?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type SalaryPaymentListRelationFilter = {
    every?: SalaryPaymentWhereInput
    some?: SalaryPaymentWhereInput
    none?: SalaryPaymentWhereInput
  }

  export type LeaveRequestListRelationFilter = {
    every?: LeaveRequestWhereInput
    some?: LeaveRequestWhereInput
    none?: LeaveRequestWhereInput
  }

  export type EmployeeDocumentListRelationFilter = {
    every?: EmployeeDocumentWhereInput
    some?: EmployeeDocumentWhereInput
    none?: EmployeeDocumentWhereInput
  }

  export type EmployeeLeaveBalanceNullableScalarRelationFilter = {
    is?: EmployeeLeaveBalanceWhereInput | null
    isNot?: EmployeeLeaveBalanceWhereInput | null
  }

  export type SalaryPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaveRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    department?: SortOrder
    startDate?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    taxId?: SortOrder
    socialSecurityNumber?: SortOrder
    bankAccount?: SortOrder
    salary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeAvgOrderByAggregateInput = {
    salary?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    department?: SortOrder
    startDate?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    taxId?: SortOrder
    socialSecurityNumber?: SortOrder
    bankAccount?: SortOrder
    salary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    department?: SortOrder
    startDate?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    taxId?: SortOrder
    socialSecurityNumber?: SortOrder
    bankAccount?: SortOrder
    salary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeSumOrderByAggregateInput = {
    salary?: SortOrder
  }

  export type EnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type EnumSalaryPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SalaryPaymentType | EnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSalaryPaymentTypeFilter<$PrismaModel> | $Enums.SalaryPaymentType
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type BonusTypeNullableScalarRelationFilter = {
    is?: BonusTypeWhereInput | null
    isNot?: BonusTypeWhereInput | null
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type SalaryPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    paymentDate?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    bonusTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalaryPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
  }

  export type SalaryPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    paymentDate?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    bonusTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalaryPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    paymentDate?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    bonusTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalaryPaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
  }

  export type EnumSalaryPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SalaryPaymentType | EnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSalaryPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.SalaryPaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSalaryPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumSalaryPaymentTypeFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumLeaveTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeFilter<$PrismaModel> | $Enums.LeaveType
  }

  export type EnumLeaveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusFilter<$PrismaModel> | $Enums.LeaveStatus
  }

  export type LeaveRequestCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    days?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveRequestAvgOrderByAggregateInput = {
    days?: SortOrder
  }

  export type LeaveRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    days?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveRequestMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    days?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveRequestSumOrderByAggregateInput = {
    days?: SortOrder
  }

  export type EnumLeaveTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeWithAggregatesFilter<$PrismaModel> | $Enums.LeaveType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveTypeFilter<$PrismaModel>
    _max?: NestedEnumLeaveTypeFilter<$PrismaModel>
  }

  export type EnumLeaveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveStatusFilter<$PrismaModel>
  }

  export type EmployeeDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    title?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeDocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EmployeeDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    title?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    title?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    uploadDate?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeDocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EmployeeLeaveBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeLeaveBalanceAvgOrderByAggregateInput = {
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
  }

  export type EmployeeLeaveBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeLeaveBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeLeaveBalanceSumOrderByAggregateInput = {
    year?: SortOrder
    annualLeaveTotal?: SortOrder
    annualLeaveUsed?: SortOrder
    sickLeaveTotal?: SortOrder
    sickLeaveUsed?: SortOrder
  }

  export type BonusTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BonusTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BonusTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<ContactCreateWithoutInvoicesInput, ContactUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: ContactCreateOrConnectWithoutInvoicesInput
    connect?: ContactWhereUniqueInput
  }

  export type ContactCreateNestedOneWithoutInvoice_Invoice_supplierIdToContactInput = {
    create?: XOR<ContactCreateWithoutInvoice_Invoice_supplierIdToContactInput, ContactUncheckedCreateWithoutInvoice_Invoice_supplierIdToContactInput>
    connectOrCreate?: ContactCreateOrConnectWithoutInvoice_Invoice_supplierIdToContactInput
    connect?: ContactWhereUniqueInput
  }

  export type InvoiceFileCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceFileCreateWithoutInvoiceInput, InvoiceFileUncheckedCreateWithoutInvoiceInput> | InvoiceFileCreateWithoutInvoiceInput[] | InvoiceFileUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceFileCreateOrConnectWithoutInvoiceInput | InvoiceFileCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceFileCreateManyInvoiceInputEnvelope
    connect?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
  }

  export type InvoiceItemCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
  }

  export type InvoiceFileUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceFileCreateWithoutInvoiceInput, InvoiceFileUncheckedCreateWithoutInvoiceInput> | InvoiceFileCreateWithoutInvoiceInput[] | InvoiceFileUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceFileCreateOrConnectWithoutInvoiceInput | InvoiceFileCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceFileCreateManyInvoiceInputEnvelope
    connect?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
  }

  export type InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ContactUpdateOneWithoutInvoicesNestedInput = {
    create?: XOR<ContactCreateWithoutInvoicesInput, ContactUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: ContactCreateOrConnectWithoutInvoicesInput
    upsert?: ContactUpsertWithoutInvoicesInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutInvoicesInput, ContactUpdateWithoutInvoicesInput>, ContactUncheckedUpdateWithoutInvoicesInput>
  }

  export type ContactUpdateOneWithoutInvoice_Invoice_supplierIdToContactNestedInput = {
    create?: XOR<ContactCreateWithoutInvoice_Invoice_supplierIdToContactInput, ContactUncheckedCreateWithoutInvoice_Invoice_supplierIdToContactInput>
    connectOrCreate?: ContactCreateOrConnectWithoutInvoice_Invoice_supplierIdToContactInput
    upsert?: ContactUpsertWithoutInvoice_Invoice_supplierIdToContactInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutInvoice_Invoice_supplierIdToContactInput, ContactUpdateWithoutInvoice_Invoice_supplierIdToContactInput>, ContactUncheckedUpdateWithoutInvoice_Invoice_supplierIdToContactInput>
  }

  export type InvoiceFileUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceFileCreateWithoutInvoiceInput, InvoiceFileUncheckedCreateWithoutInvoiceInput> | InvoiceFileCreateWithoutInvoiceInput[] | InvoiceFileUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceFileCreateOrConnectWithoutInvoiceInput | InvoiceFileCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceFileUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceFileUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceFileCreateManyInvoiceInputEnvelope
    set?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    disconnect?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    delete?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    connect?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    update?: InvoiceFileUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceFileUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceFileUpdateManyWithWhereWithoutInvoiceInput | InvoiceFileUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceFileScalarWhereInput | InvoiceFileScalarWhereInput[]
  }

  export type InvoiceItemUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    set?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    disconnect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    delete?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    update?: InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceItemUpdateManyWithWhereWithoutInvoiceInput | InvoiceItemUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
  }

  export type InvoiceFileUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceFileCreateWithoutInvoiceInput, InvoiceFileUncheckedCreateWithoutInvoiceInput> | InvoiceFileCreateWithoutInvoiceInput[] | InvoiceFileUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceFileCreateOrConnectWithoutInvoiceInput | InvoiceFileCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceFileUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceFileUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceFileCreateManyInvoiceInputEnvelope
    set?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    disconnect?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    delete?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    connect?: InvoiceFileWhereUniqueInput | InvoiceFileWhereUniqueInput[]
    update?: InvoiceFileUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceFileUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceFileUpdateManyWithWhereWithoutInvoiceInput | InvoiceFileUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceFileScalarWhereInput | InvoiceFileScalarWhereInput[]
  }

  export type InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    set?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    disconnect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    delete?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    update?: InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceItemUpdateManyWithWhereWithoutInvoiceInput | InvoiceItemUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
  }

  export type InvoiceCreateNestedOneWithoutItemsInput = {
    create?: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutItemsInput
    connect?: InvoiceWhereUniqueInput
  }

  export type InvoiceUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutItemsInput
    upsert?: InvoiceUpsertWithoutItemsInput
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutItemsInput, InvoiceUpdateWithoutItemsInput>, InvoiceUncheckedUpdateWithoutItemsInput>
  }

  export type ExpenseCreateNestedManyWithoutContactInput = {
    create?: XOR<ExpenseCreateWithoutContactInput, ExpenseUncheckedCreateWithoutContactInput> | ExpenseCreateWithoutContactInput[] | ExpenseUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutContactInput | ExpenseCreateOrConnectWithoutContactInput[]
    createMany?: ExpenseCreateManyContactInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutCustomerInput = {
    create?: XOR<InvoiceCreateWithoutCustomerInput, InvoiceUncheckedCreateWithoutCustomerInput> | InvoiceCreateWithoutCustomerInput[] | InvoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutCustomerInput | InvoiceCreateOrConnectWithoutCustomerInput[]
    createMany?: InvoiceCreateManyCustomerInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput = {
    create?: XOR<InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput> | InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput[] | InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput | InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput[]
    createMany?: InvoiceCreateManyContact_Invoice_supplierIdToContactInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type RecurringTransactionCreateNestedManyWithoutContactInput = {
    create?: XOR<RecurringTransactionCreateWithoutContactInput, RecurringTransactionUncheckedCreateWithoutContactInput> | RecurringTransactionCreateWithoutContactInput[] | RecurringTransactionUncheckedCreateWithoutContactInput[]
    connectOrCreate?: RecurringTransactionCreateOrConnectWithoutContactInput | RecurringTransactionCreateOrConnectWithoutContactInput[]
    createMany?: RecurringTransactionCreateManyContactInputEnvelope
    connect?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<ExpenseCreateWithoutContactInput, ExpenseUncheckedCreateWithoutContactInput> | ExpenseCreateWithoutContactInput[] | ExpenseUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutContactInput | ExpenseCreateOrConnectWithoutContactInput[]
    createMany?: ExpenseCreateManyContactInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<InvoiceCreateWithoutCustomerInput, InvoiceUncheckedCreateWithoutCustomerInput> | InvoiceCreateWithoutCustomerInput[] | InvoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutCustomerInput | InvoiceCreateOrConnectWithoutCustomerInput[]
    createMany?: InvoiceCreateManyCustomerInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput = {
    create?: XOR<InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput> | InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput[] | InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput | InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput[]
    createMany?: InvoiceCreateManyContact_Invoice_supplierIdToContactInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<RecurringTransactionCreateWithoutContactInput, RecurringTransactionUncheckedCreateWithoutContactInput> | RecurringTransactionCreateWithoutContactInput[] | RecurringTransactionUncheckedCreateWithoutContactInput[]
    connectOrCreate?: RecurringTransactionCreateOrConnectWithoutContactInput | RecurringTransactionCreateOrConnectWithoutContactInput[]
    createMany?: RecurringTransactionCreateManyContactInputEnvelope
    connect?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
  }

  export type ExpenseUpdateManyWithoutContactNestedInput = {
    create?: XOR<ExpenseCreateWithoutContactInput, ExpenseUncheckedCreateWithoutContactInput> | ExpenseCreateWithoutContactInput[] | ExpenseUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutContactInput | ExpenseCreateOrConnectWithoutContactInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutContactInput | ExpenseUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: ExpenseCreateManyContactInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutContactInput | ExpenseUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutContactInput | ExpenseUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<InvoiceCreateWithoutCustomerInput, InvoiceUncheckedCreateWithoutCustomerInput> | InvoiceCreateWithoutCustomerInput[] | InvoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutCustomerInput | InvoiceCreateOrConnectWithoutCustomerInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutCustomerInput | InvoiceUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: InvoiceCreateManyCustomerInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutCustomerInput | InvoiceUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutCustomerInput | InvoiceUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput = {
    create?: XOR<InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput> | InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput[] | InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput | InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput | InvoiceUpsertWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput[]
    createMany?: InvoiceCreateManyContact_Invoice_supplierIdToContactInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput | InvoiceUpdateWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutContact_Invoice_supplierIdToContactInput | InvoiceUpdateManyWithWhereWithoutContact_Invoice_supplierIdToContactInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type RecurringTransactionUpdateManyWithoutContactNestedInput = {
    create?: XOR<RecurringTransactionCreateWithoutContactInput, RecurringTransactionUncheckedCreateWithoutContactInput> | RecurringTransactionCreateWithoutContactInput[] | RecurringTransactionUncheckedCreateWithoutContactInput[]
    connectOrCreate?: RecurringTransactionCreateOrConnectWithoutContactInput | RecurringTransactionCreateOrConnectWithoutContactInput[]
    upsert?: RecurringTransactionUpsertWithWhereUniqueWithoutContactInput | RecurringTransactionUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: RecurringTransactionCreateManyContactInputEnvelope
    set?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    disconnect?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    delete?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    connect?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    update?: RecurringTransactionUpdateWithWhereUniqueWithoutContactInput | RecurringTransactionUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: RecurringTransactionUpdateManyWithWhereWithoutContactInput | RecurringTransactionUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: RecurringTransactionScalarWhereInput | RecurringTransactionScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<ExpenseCreateWithoutContactInput, ExpenseUncheckedCreateWithoutContactInput> | ExpenseCreateWithoutContactInput[] | ExpenseUncheckedCreateWithoutContactInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutContactInput | ExpenseCreateOrConnectWithoutContactInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutContactInput | ExpenseUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: ExpenseCreateManyContactInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutContactInput | ExpenseUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutContactInput | ExpenseUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<InvoiceCreateWithoutCustomerInput, InvoiceUncheckedCreateWithoutCustomerInput> | InvoiceCreateWithoutCustomerInput[] | InvoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutCustomerInput | InvoiceCreateOrConnectWithoutCustomerInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutCustomerInput | InvoiceUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: InvoiceCreateManyCustomerInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutCustomerInput | InvoiceUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutCustomerInput | InvoiceUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput = {
    create?: XOR<InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput> | InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput[] | InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput | InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput | InvoiceUpsertWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput[]
    createMany?: InvoiceCreateManyContact_Invoice_supplierIdToContactInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput | InvoiceUpdateWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutContact_Invoice_supplierIdToContactInput | InvoiceUpdateManyWithWhereWithoutContact_Invoice_supplierIdToContactInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<RecurringTransactionCreateWithoutContactInput, RecurringTransactionUncheckedCreateWithoutContactInput> | RecurringTransactionCreateWithoutContactInput[] | RecurringTransactionUncheckedCreateWithoutContactInput[]
    connectOrCreate?: RecurringTransactionCreateOrConnectWithoutContactInput | RecurringTransactionCreateOrConnectWithoutContactInput[]
    upsert?: RecurringTransactionUpsertWithWhereUniqueWithoutContactInput | RecurringTransactionUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: RecurringTransactionCreateManyContactInputEnvelope
    set?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    disconnect?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    delete?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    connect?: RecurringTransactionWhereUniqueInput | RecurringTransactionWhereUniqueInput[]
    update?: RecurringTransactionUpdateWithWhereUniqueWithoutContactInput | RecurringTransactionUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: RecurringTransactionUpdateManyWithWhereWithoutContactInput | RecurringTransactionUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: RecurringTransactionScalarWhereInput | RecurringTransactionScalarWhereInput[]
  }

  export type ContactCreateNestedOneWithoutExpenseInput = {
    create?: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: ContactCreateOrConnectWithoutExpenseInput
    connect?: ContactWhereUniqueInput
  }

  export type ContactUpdateOneWithoutExpenseNestedInput = {
    create?: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: ContactCreateOrConnectWithoutExpenseInput
    upsert?: ContactUpsertWithoutExpenseInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutExpenseInput, ContactUpdateWithoutExpenseInput>, ContactUncheckedUpdateWithoutExpenseInput>
  }

  export type InvoiceCreateNestedOneWithoutInvoiceFileInput = {
    create?: XOR<InvoiceCreateWithoutInvoiceFileInput, InvoiceUncheckedCreateWithoutInvoiceFileInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutInvoiceFileInput
    connect?: InvoiceWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InvoiceUpdateOneRequiredWithoutInvoiceFileNestedInput = {
    create?: XOR<InvoiceCreateWithoutInvoiceFileInput, InvoiceUncheckedCreateWithoutInvoiceFileInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutInvoiceFileInput
    upsert?: InvoiceUpsertWithoutInvoiceFileInput
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutInvoiceFileInput, InvoiceUpdateWithoutInvoiceFileInput>, InvoiceUncheckedUpdateWithoutInvoiceFileInput>
  }

  export type ContactCreateNestedOneWithoutRecurringTransactionInput = {
    create?: XOR<ContactCreateWithoutRecurringTransactionInput, ContactUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: ContactCreateOrConnectWithoutRecurringTransactionInput
    connect?: ContactWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContactUpdateOneWithoutRecurringTransactionNestedInput = {
    create?: XOR<ContactCreateWithoutRecurringTransactionInput, ContactUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: ContactCreateOrConnectWithoutRecurringTransactionInput
    upsert?: ContactUpsertWithoutRecurringTransactionInput
    disconnect?: ContactWhereInput | boolean
    delete?: ContactWhereInput | boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutRecurringTransactionInput, ContactUpdateWithoutRecurringTransactionInput>, ContactUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type SalaryPaymentCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<SalaryPaymentCreateWithoutEmployeeInput, SalaryPaymentUncheckedCreateWithoutEmployeeInput> | SalaryPaymentCreateWithoutEmployeeInput[] | SalaryPaymentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutEmployeeInput | SalaryPaymentCreateOrConnectWithoutEmployeeInput[]
    createMany?: SalaryPaymentCreateManyEmployeeInputEnvelope
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
  }

  export type LeaveRequestCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
  }

  export type EmployeeDocumentCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeDocumentCreateWithoutEmployeeInput, EmployeeDocumentUncheckedCreateWithoutEmployeeInput> | EmployeeDocumentCreateWithoutEmployeeInput[] | EmployeeDocumentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeDocumentCreateOrConnectWithoutEmployeeInput | EmployeeDocumentCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeDocumentCreateManyEmployeeInputEnvelope
    connect?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
  }

  export type EmployeeLeaveBalanceCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeLeaveBalanceCreateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeLeaveBalanceCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeLeaveBalanceWhereUniqueInput
  }

  export type SalaryPaymentUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<SalaryPaymentCreateWithoutEmployeeInput, SalaryPaymentUncheckedCreateWithoutEmployeeInput> | SalaryPaymentCreateWithoutEmployeeInput[] | SalaryPaymentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutEmployeeInput | SalaryPaymentCreateOrConnectWithoutEmployeeInput[]
    createMany?: SalaryPaymentCreateManyEmployeeInputEnvelope
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
  }

  export type LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
  }

  export type EmployeeDocumentUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeDocumentCreateWithoutEmployeeInput, EmployeeDocumentUncheckedCreateWithoutEmployeeInput> | EmployeeDocumentCreateWithoutEmployeeInput[] | EmployeeDocumentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeDocumentCreateOrConnectWithoutEmployeeInput | EmployeeDocumentCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeDocumentCreateManyEmployeeInputEnvelope
    connect?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
  }

  export type EmployeeLeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeLeaveBalanceCreateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeLeaveBalanceCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeLeaveBalanceWhereUniqueInput
  }

  export type EnumEmployeeStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeStatus
  }

  export type SalaryPaymentUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<SalaryPaymentCreateWithoutEmployeeInput, SalaryPaymentUncheckedCreateWithoutEmployeeInput> | SalaryPaymentCreateWithoutEmployeeInput[] | SalaryPaymentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutEmployeeInput | SalaryPaymentCreateOrConnectWithoutEmployeeInput[]
    upsert?: SalaryPaymentUpsertWithWhereUniqueWithoutEmployeeInput | SalaryPaymentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: SalaryPaymentCreateManyEmployeeInputEnvelope
    set?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    disconnect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    delete?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    update?: SalaryPaymentUpdateWithWhereUniqueWithoutEmployeeInput | SalaryPaymentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: SalaryPaymentUpdateManyWithWhereWithoutEmployeeInput | SalaryPaymentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: SalaryPaymentScalarWhereInput | SalaryPaymentScalarWhereInput[]
  }

  export type LeaveRequestUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    set?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    disconnect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    delete?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    update?: LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: LeaveRequestUpdateManyWithWhereWithoutEmployeeInput | LeaveRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
  }

  export type EmployeeDocumentUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeDocumentCreateWithoutEmployeeInput, EmployeeDocumentUncheckedCreateWithoutEmployeeInput> | EmployeeDocumentCreateWithoutEmployeeInput[] | EmployeeDocumentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeDocumentCreateOrConnectWithoutEmployeeInput | EmployeeDocumentCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeDocumentUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeDocumentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeDocumentCreateManyEmployeeInputEnvelope
    set?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    disconnect?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    delete?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    connect?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    update?: EmployeeDocumentUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeDocumentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeDocumentUpdateManyWithWhereWithoutEmployeeInput | EmployeeDocumentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeDocumentScalarWhereInput | EmployeeDocumentScalarWhereInput[]
  }

  export type EmployeeLeaveBalanceUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeLeaveBalanceCreateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeLeaveBalanceCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeLeaveBalanceUpsertWithoutEmployeeInput
    disconnect?: EmployeeLeaveBalanceWhereInput | boolean
    delete?: EmployeeLeaveBalanceWhereInput | boolean
    connect?: EmployeeLeaveBalanceWhereUniqueInput
    update?: XOR<XOR<EmployeeLeaveBalanceUpdateToOneWithWhereWithoutEmployeeInput, EmployeeLeaveBalanceUpdateWithoutEmployeeInput>, EmployeeLeaveBalanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type SalaryPaymentUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<SalaryPaymentCreateWithoutEmployeeInput, SalaryPaymentUncheckedCreateWithoutEmployeeInput> | SalaryPaymentCreateWithoutEmployeeInput[] | SalaryPaymentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutEmployeeInput | SalaryPaymentCreateOrConnectWithoutEmployeeInput[]
    upsert?: SalaryPaymentUpsertWithWhereUniqueWithoutEmployeeInput | SalaryPaymentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: SalaryPaymentCreateManyEmployeeInputEnvelope
    set?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    disconnect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    delete?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    update?: SalaryPaymentUpdateWithWhereUniqueWithoutEmployeeInput | SalaryPaymentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: SalaryPaymentUpdateManyWithWhereWithoutEmployeeInput | SalaryPaymentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: SalaryPaymentScalarWhereInput | SalaryPaymentScalarWhereInput[]
  }

  export type LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    set?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    disconnect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    delete?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    update?: LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: LeaveRequestUpdateManyWithWhereWithoutEmployeeInput | LeaveRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
  }

  export type EmployeeDocumentUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeDocumentCreateWithoutEmployeeInput, EmployeeDocumentUncheckedCreateWithoutEmployeeInput> | EmployeeDocumentCreateWithoutEmployeeInput[] | EmployeeDocumentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeDocumentCreateOrConnectWithoutEmployeeInput | EmployeeDocumentCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeDocumentUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeDocumentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeDocumentCreateManyEmployeeInputEnvelope
    set?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    disconnect?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    delete?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    connect?: EmployeeDocumentWhereUniqueInput | EmployeeDocumentWhereUniqueInput[]
    update?: EmployeeDocumentUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeDocumentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeDocumentUpdateManyWithWhereWithoutEmployeeInput | EmployeeDocumentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeDocumentScalarWhereInput | EmployeeDocumentScalarWhereInput[]
  }

  export type EmployeeLeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeLeaveBalanceCreateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeLeaveBalanceCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeLeaveBalanceUpsertWithoutEmployeeInput
    disconnect?: EmployeeLeaveBalanceWhereInput | boolean
    delete?: EmployeeLeaveBalanceWhereInput | boolean
    connect?: EmployeeLeaveBalanceWhereUniqueInput
    update?: XOR<XOR<EmployeeLeaveBalanceUpdateToOneWithWhereWithoutEmployeeInput, EmployeeLeaveBalanceUpdateWithoutEmployeeInput>, EmployeeLeaveBalanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type BonusTypeCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<BonusTypeCreateWithoutPaymentsInput, BonusTypeUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BonusTypeCreateOrConnectWithoutPaymentsInput
    connect?: BonusTypeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutSalaryPaymentsInput = {
    create?: XOR<EmployeeCreateWithoutSalaryPaymentsInput, EmployeeUncheckedCreateWithoutSalaryPaymentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSalaryPaymentsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumSalaryPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.SalaryPaymentType
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type BonusTypeUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<BonusTypeCreateWithoutPaymentsInput, BonusTypeUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BonusTypeCreateOrConnectWithoutPaymentsInput
    upsert?: BonusTypeUpsertWithoutPaymentsInput
    disconnect?: BonusTypeWhereInput | boolean
    delete?: BonusTypeWhereInput | boolean
    connect?: BonusTypeWhereUniqueInput
    update?: XOR<XOR<BonusTypeUpdateToOneWithWhereWithoutPaymentsInput, BonusTypeUpdateWithoutPaymentsInput>, BonusTypeUncheckedUpdateWithoutPaymentsInput>
  }

  export type EmployeeUpdateOneRequiredWithoutSalaryPaymentsNestedInput = {
    create?: XOR<EmployeeCreateWithoutSalaryPaymentsInput, EmployeeUncheckedCreateWithoutSalaryPaymentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSalaryPaymentsInput
    upsert?: EmployeeUpsertWithoutSalaryPaymentsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutSalaryPaymentsInput, EmployeeUpdateWithoutSalaryPaymentsInput>, EmployeeUncheckedUpdateWithoutSalaryPaymentsInput>
  }

  export type EmployeeCreateNestedOneWithoutLeaveRequestsInput = {
    create?: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveRequestsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumLeaveTypeFieldUpdateOperationsInput = {
    set?: $Enums.LeaveType
  }

  export type EnumLeaveStatusFieldUpdateOperationsInput = {
    set?: $Enums.LeaveStatus
  }

  export type EmployeeUpdateOneRequiredWithoutLeaveRequestsNestedInput = {
    create?: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveRequestsInput
    upsert?: EmployeeUpsertWithoutLeaveRequestsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutLeaveRequestsInput, EmployeeUpdateWithoutLeaveRequestsInput>, EmployeeUncheckedUpdateWithoutLeaveRequestsInput>
  }

  export type EmployeeCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<EmployeeCreateWithoutDocumentsInput, EmployeeUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutDocumentsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<EmployeeCreateWithoutDocumentsInput, EmployeeUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutDocumentsInput
    upsert?: EmployeeUpsertWithoutDocumentsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutDocumentsInput, EmployeeUpdateWithoutDocumentsInput>, EmployeeUncheckedUpdateWithoutDocumentsInput>
  }

  export type EmployeeCreateNestedOneWithoutLeaveBalanceInput = {
    create?: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveBalanceInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutLeaveBalanceNestedInput = {
    create?: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveBalanceInput
    upsert?: EmployeeUpsertWithoutLeaveBalanceInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutLeaveBalanceInput, EmployeeUpdateWithoutLeaveBalanceInput>, EmployeeUncheckedUpdateWithoutLeaveBalanceInput>
  }

  export type SalaryPaymentCreateNestedManyWithoutBonusTypeInput = {
    create?: XOR<SalaryPaymentCreateWithoutBonusTypeInput, SalaryPaymentUncheckedCreateWithoutBonusTypeInput> | SalaryPaymentCreateWithoutBonusTypeInput[] | SalaryPaymentUncheckedCreateWithoutBonusTypeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutBonusTypeInput | SalaryPaymentCreateOrConnectWithoutBonusTypeInput[]
    createMany?: SalaryPaymentCreateManyBonusTypeInputEnvelope
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
  }

  export type SalaryPaymentUncheckedCreateNestedManyWithoutBonusTypeInput = {
    create?: XOR<SalaryPaymentCreateWithoutBonusTypeInput, SalaryPaymentUncheckedCreateWithoutBonusTypeInput> | SalaryPaymentCreateWithoutBonusTypeInput[] | SalaryPaymentUncheckedCreateWithoutBonusTypeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutBonusTypeInput | SalaryPaymentCreateOrConnectWithoutBonusTypeInput[]
    createMany?: SalaryPaymentCreateManyBonusTypeInputEnvelope
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
  }

  export type SalaryPaymentUpdateManyWithoutBonusTypeNestedInput = {
    create?: XOR<SalaryPaymentCreateWithoutBonusTypeInput, SalaryPaymentUncheckedCreateWithoutBonusTypeInput> | SalaryPaymentCreateWithoutBonusTypeInput[] | SalaryPaymentUncheckedCreateWithoutBonusTypeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutBonusTypeInput | SalaryPaymentCreateOrConnectWithoutBonusTypeInput[]
    upsert?: SalaryPaymentUpsertWithWhereUniqueWithoutBonusTypeInput | SalaryPaymentUpsertWithWhereUniqueWithoutBonusTypeInput[]
    createMany?: SalaryPaymentCreateManyBonusTypeInputEnvelope
    set?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    disconnect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    delete?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    update?: SalaryPaymentUpdateWithWhereUniqueWithoutBonusTypeInput | SalaryPaymentUpdateWithWhereUniqueWithoutBonusTypeInput[]
    updateMany?: SalaryPaymentUpdateManyWithWhereWithoutBonusTypeInput | SalaryPaymentUpdateManyWithWhereWithoutBonusTypeInput[]
    deleteMany?: SalaryPaymentScalarWhereInput | SalaryPaymentScalarWhereInput[]
  }

  export type SalaryPaymentUncheckedUpdateManyWithoutBonusTypeNestedInput = {
    create?: XOR<SalaryPaymentCreateWithoutBonusTypeInput, SalaryPaymentUncheckedCreateWithoutBonusTypeInput> | SalaryPaymentCreateWithoutBonusTypeInput[] | SalaryPaymentUncheckedCreateWithoutBonusTypeInput[]
    connectOrCreate?: SalaryPaymentCreateOrConnectWithoutBonusTypeInput | SalaryPaymentCreateOrConnectWithoutBonusTypeInput[]
    upsert?: SalaryPaymentUpsertWithWhereUniqueWithoutBonusTypeInput | SalaryPaymentUpsertWithWhereUniqueWithoutBonusTypeInput[]
    createMany?: SalaryPaymentCreateManyBonusTypeInputEnvelope
    set?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    disconnect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    delete?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    connect?: SalaryPaymentWhereUniqueInput | SalaryPaymentWhereUniqueInput[]
    update?: SalaryPaymentUpdateWithWhereUniqueWithoutBonusTypeInput | SalaryPaymentUpdateWithWhereUniqueWithoutBonusTypeInput[]
    updateMany?: SalaryPaymentUpdateManyWithWhereWithoutBonusTypeInput | SalaryPaymentUpdateManyWithWhereWithoutBonusTypeInput[]
    deleteMany?: SalaryPaymentScalarWhereInput | SalaryPaymentScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type NestedEnumSalaryPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SalaryPaymentType | EnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSalaryPaymentTypeFilter<$PrismaModel> | $Enums.SalaryPaymentType
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumSalaryPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SalaryPaymentType | EnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SalaryPaymentType[] | ListEnumSalaryPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSalaryPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.SalaryPaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSalaryPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumSalaryPaymentTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumLeaveTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeFilter<$PrismaModel> | $Enums.LeaveType
  }

  export type NestedEnumLeaveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusFilter<$PrismaModel> | $Enums.LeaveStatus
  }

  export type NestedEnumLeaveTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeWithAggregatesFilter<$PrismaModel> | $Enums.LeaveType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveTypeFilter<$PrismaModel>
    _max?: NestedEnumLeaveTypeFilter<$PrismaModel>
  }

  export type NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveStatusFilter<$PrismaModel>
  }

  export type ContactCreateWithoutInvoicesInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseCreateNestedManyWithoutContactInput
    Invoice_Invoice_supplierIdToContact?: InvoiceCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
    RecurringTransaction?: RecurringTransactionCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutInvoicesInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseUncheckedCreateNestedManyWithoutContactInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
    RecurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutInvoicesInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutInvoicesInput, ContactUncheckedCreateWithoutInvoicesInput>
  }

  export type ContactCreateWithoutInvoice_Invoice_supplierIdToContactInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseCreateNestedManyWithoutContactInput
    invoices?: InvoiceCreateNestedManyWithoutCustomerInput
    RecurringTransaction?: RecurringTransactionCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutInvoice_Invoice_supplierIdToContactInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseUncheckedCreateNestedManyWithoutContactInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutCustomerInput
    RecurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutInvoice_Invoice_supplierIdToContactInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutInvoice_Invoice_supplierIdToContactInput, ContactUncheckedCreateWithoutInvoice_Invoice_supplierIdToContactInput>
  }

  export type InvoiceFileCreateWithoutInvoiceInput = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceFileUncheckedCreateWithoutInvoiceInput = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceFileCreateOrConnectWithoutInvoiceInput = {
    where: InvoiceFileWhereUniqueInput
    create: XOR<InvoiceFileCreateWithoutInvoiceInput, InvoiceFileUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceFileCreateManyInvoiceInputEnvelope = {
    data: InvoiceFileCreateManyInvoiceInput | InvoiceFileCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceItemCreateWithoutInvoiceInput = {
    id?: string
    description: string
    quantity?: Decimal | DecimalJsLike | number | string
    unitPrice: Decimal | DecimalJsLike | number | string
    vatRate?: Decimal | DecimalJsLike | number | string
    vatAmount?: Decimal | DecimalJsLike | number | string
    totalAmount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceItemUncheckedCreateWithoutInvoiceInput = {
    id?: string
    description: string
    quantity?: Decimal | DecimalJsLike | number | string
    unitPrice: Decimal | DecimalJsLike | number | string
    vatRate?: Decimal | DecimalJsLike | number | string
    vatAmount?: Decimal | DecimalJsLike | number | string
    totalAmount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceItemCreateOrConnectWithoutInvoiceInput = {
    where: InvoiceItemWhereUniqueInput
    create: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceItemCreateManyInvoiceInputEnvelope = {
    data: InvoiceItemCreateManyInvoiceInput | InvoiceItemCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type ContactUpsertWithoutInvoicesInput = {
    update: XOR<ContactUpdateWithoutInvoicesInput, ContactUncheckedUpdateWithoutInvoicesInput>
    create: XOR<ContactCreateWithoutInvoicesInput, ContactUncheckedCreateWithoutInvoicesInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutInvoicesInput, ContactUncheckedUpdateWithoutInvoicesInput>
  }

  export type ContactUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUpdateManyWithoutContactNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
    RecurringTransaction?: RecurringTransactionUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUncheckedUpdateManyWithoutContactNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
    RecurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutContactNestedInput
  }

  export type ContactUpsertWithoutInvoice_Invoice_supplierIdToContactInput = {
    update: XOR<ContactUpdateWithoutInvoice_Invoice_supplierIdToContactInput, ContactUncheckedUpdateWithoutInvoice_Invoice_supplierIdToContactInput>
    create: XOR<ContactCreateWithoutInvoice_Invoice_supplierIdToContactInput, ContactUncheckedCreateWithoutInvoice_Invoice_supplierIdToContactInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutInvoice_Invoice_supplierIdToContactInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutInvoice_Invoice_supplierIdToContactInput, ContactUncheckedUpdateWithoutInvoice_Invoice_supplierIdToContactInput>
  }

  export type ContactUpdateWithoutInvoice_Invoice_supplierIdToContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUpdateManyWithoutContactNestedInput
    invoices?: InvoiceUpdateManyWithoutCustomerNestedInput
    RecurringTransaction?: RecurringTransactionUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutInvoice_Invoice_supplierIdToContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUncheckedUpdateManyWithoutContactNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutCustomerNestedInput
    RecurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutContactNestedInput
  }

  export type InvoiceFileUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceFileWhereUniqueInput
    update: XOR<InvoiceFileUpdateWithoutInvoiceInput, InvoiceFileUncheckedUpdateWithoutInvoiceInput>
    create: XOR<InvoiceFileCreateWithoutInvoiceInput, InvoiceFileUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceFileUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceFileWhereUniqueInput
    data: XOR<InvoiceFileUpdateWithoutInvoiceInput, InvoiceFileUncheckedUpdateWithoutInvoiceInput>
  }

  export type InvoiceFileUpdateManyWithWhereWithoutInvoiceInput = {
    where: InvoiceFileScalarWhereInput
    data: XOR<InvoiceFileUpdateManyMutationInput, InvoiceFileUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type InvoiceFileScalarWhereInput = {
    AND?: InvoiceFileScalarWhereInput | InvoiceFileScalarWhereInput[]
    OR?: InvoiceFileScalarWhereInput[]
    NOT?: InvoiceFileScalarWhereInput | InvoiceFileScalarWhereInput[]
    id?: StringFilter<"InvoiceFile"> | string
    filename?: StringFilter<"InvoiceFile"> | string
    fileKey?: StringFilter<"InvoiceFile"> | string
    fileSize?: IntFilter<"InvoiceFile"> | number
    mimeType?: StringFilter<"InvoiceFile"> | string
    uploadDate?: DateTimeFilter<"InvoiceFile"> | Date | string
    invoiceId?: StringFilter<"InvoiceFile"> | string
    createdAt?: DateTimeFilter<"InvoiceFile"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceFile"> | Date | string
  }

  export type InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceItemWhereUniqueInput
    update: XOR<InvoiceItemUpdateWithoutInvoiceInput, InvoiceItemUncheckedUpdateWithoutInvoiceInput>
    create: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceItemWhereUniqueInput
    data: XOR<InvoiceItemUpdateWithoutInvoiceInput, InvoiceItemUncheckedUpdateWithoutInvoiceInput>
  }

  export type InvoiceItemUpdateManyWithWhereWithoutInvoiceInput = {
    where: InvoiceItemScalarWhereInput
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type InvoiceItemScalarWhereInput = {
    AND?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
    OR?: InvoiceItemScalarWhereInput[]
    NOT?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
    id?: StringFilter<"InvoiceItem"> | string
    description?: StringFilter<"InvoiceItem"> | string
    quantity?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFilter<"InvoiceItem"> | Decimal | DecimalJsLike | number | string
    invoiceId?: StringFilter<"InvoiceItem"> | string
    createdAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceItem"> | Date | string
  }

  export type InvoiceCreateWithoutItemsInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    customer?: ContactCreateNestedOneWithoutInvoicesInput
    Contact_Invoice_supplierIdToContact?: ContactCreateNestedOneWithoutInvoice_Invoice_supplierIdToContactInput
    InvoiceFile?: InvoiceFileCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutItemsInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    customerId?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    InvoiceFile?: InvoiceFileUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutItemsInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
  }

  export type InvoiceUpsertWithoutItemsInput = {
    update: XOR<InvoiceUpdateWithoutItemsInput, InvoiceUncheckedUpdateWithoutItemsInput>
    create: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutItemsInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutItemsInput, InvoiceUncheckedUpdateWithoutItemsInput>
  }

  export type InvoiceUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: ContactUpdateOneWithoutInvoicesNestedInput
    Contact_Invoice_supplierIdToContact?: ContactUpdateOneWithoutInvoice_Invoice_supplierIdToContactNestedInput
    InvoiceFile?: InvoiceFileUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    InvoiceFile?: InvoiceFileUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type ExpenseCreateWithoutContactInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    category: string
    paymentMethod: string
    status?: string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type ExpenseUncheckedCreateWithoutContactInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    category: string
    paymentMethod: string
    status?: string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type ExpenseCreateOrConnectWithoutContactInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutContactInput, ExpenseUncheckedCreateWithoutContactInput>
  }

  export type ExpenseCreateManyContactInputEnvelope = {
    data: ExpenseCreateManyContactInput | ExpenseCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutCustomerInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    Contact_Invoice_supplierIdToContact?: ContactCreateNestedOneWithoutInvoice_Invoice_supplierIdToContactInput
    InvoiceFile?: InvoiceFileCreateNestedManyWithoutInvoiceInput
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutCustomerInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    InvoiceFile?: InvoiceFileUncheckedCreateNestedManyWithoutInvoiceInput
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutCustomerInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutCustomerInput, InvoiceUncheckedCreateWithoutCustomerInput>
  }

  export type InvoiceCreateManyCustomerInputEnvelope = {
    data: InvoiceCreateManyCustomerInput | InvoiceCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    customer?: ContactCreateNestedOneWithoutInvoicesInput
    InvoiceFile?: InvoiceFileCreateNestedManyWithoutInvoiceInput
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    customerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    InvoiceFile?: InvoiceFileUncheckedCreateNestedManyWithoutInvoiceInput
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutContact_Invoice_supplierIdToContactInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput>
  }

  export type InvoiceCreateManyContact_Invoice_supplierIdToContactInputEnvelope = {
    data: InvoiceCreateManyContact_Invoice_supplierIdToContactInput | InvoiceCreateManyContact_Invoice_supplierIdToContactInput[]
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutContactInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: string
    category: string
    paymentMethod?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    frequency?: string
    dayOfMonth?: number | null
    dayOfWeek?: number | null
    isActive?: boolean
    lastProcessed?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type RecurringTransactionUncheckedCreateWithoutContactInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: string
    category: string
    paymentMethod?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    frequency?: string
    dayOfMonth?: number | null
    dayOfWeek?: number | null
    isActive?: boolean
    lastProcessed?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type RecurringTransactionCreateOrConnectWithoutContactInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutContactInput, RecurringTransactionUncheckedCreateWithoutContactInput>
  }

  export type RecurringTransactionCreateManyContactInputEnvelope = {
    data: RecurringTransactionCreateManyContactInput | RecurringTransactionCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseUpsertWithWhereUniqueWithoutContactInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutContactInput, ExpenseUncheckedUpdateWithoutContactInput>
    create: XOR<ExpenseCreateWithoutContactInput, ExpenseUncheckedCreateWithoutContactInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutContactInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutContactInput, ExpenseUncheckedUpdateWithoutContactInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutContactInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutContactInput>
  }

  export type ExpenseScalarWhereInput = {
    AND?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    OR?: ExpenseScalarWhereInput[]
    NOT?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    id?: StringFilter<"Expense"> | string
    title?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    category?: StringFilter<"Expense"> | string
    paymentMethod?: StringFilter<"Expense"> | string
    status?: StringFilter<"Expense"> | string
    receiptUrl?: StringNullableFilter<"Expense"> | string | null
    supplierId?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
  }

  export type InvoiceUpsertWithWhereUniqueWithoutCustomerInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutCustomerInput, InvoiceUncheckedUpdateWithoutCustomerInput>
    create: XOR<InvoiceCreateWithoutCustomerInput, InvoiceUncheckedCreateWithoutCustomerInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutCustomerInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutCustomerInput, InvoiceUncheckedUpdateWithoutCustomerInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutCustomerInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutCustomerInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    amount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxRate?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    taxAmount?: DecimalNullableFilter<"Invoice"> | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFilter<"Invoice"> | boolean
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    status?: StringFilter<"Invoice"> | string
    type?: StringNullableFilter<"Invoice"> | string | null
    notes?: StringNullableFilter<"Invoice"> | string | null
    customerId?: StringNullableFilter<"Invoice"> | string | null
    supplierId?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    issuerAddress?: StringNullableFilter<"Invoice"> | string | null
    issuerName?: StringNullableFilter<"Invoice"> | string | null
    issuerTaxId?: StringNullableFilter<"Invoice"> | string | null
    recipientAddress?: StringNullableFilter<"Invoice"> | string | null
    recipientName?: StringNullableFilter<"Invoice"> | string | null
    recipientTaxId?: StringNullableFilter<"Invoice"> | string | null
  }

  export type InvoiceUpsertWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedUpdateWithoutContact_Invoice_supplierIdToContactInput>
    create: XOR<InvoiceCreateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedCreateWithoutContact_Invoice_supplierIdToContactInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutContact_Invoice_supplierIdToContactInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutContact_Invoice_supplierIdToContactInput, InvoiceUncheckedUpdateWithoutContact_Invoice_supplierIdToContactInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutContact_Invoice_supplierIdToContactInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutContactInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutContactInput, RecurringTransactionUncheckedUpdateWithoutContactInput>
    create: XOR<RecurringTransactionCreateWithoutContactInput, RecurringTransactionUncheckedCreateWithoutContactInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutContactInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutContactInput, RecurringTransactionUncheckedUpdateWithoutContactInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutContactInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutContactInput>
  }

  export type RecurringTransactionScalarWhereInput = {
    AND?: RecurringTransactionScalarWhereInput | RecurringTransactionScalarWhereInput[]
    OR?: RecurringTransactionScalarWhereInput[]
    NOT?: RecurringTransactionScalarWhereInput | RecurringTransactionScalarWhereInput[]
    id?: StringFilter<"RecurringTransaction"> | string
    title?: StringFilter<"RecurringTransaction"> | string
    description?: StringNullableFilter<"RecurringTransaction"> | string | null
    amount?: DecimalFilter<"RecurringTransaction"> | Decimal | DecimalJsLike | number | string
    type?: StringFilter<"RecurringTransaction"> | string
    category?: StringFilter<"RecurringTransaction"> | string
    paymentMethod?: StringNullableFilter<"RecurringTransaction"> | string | null
    startDate?: DateTimeFilter<"RecurringTransaction"> | Date | string
    endDate?: DateTimeNullableFilter<"RecurringTransaction"> | Date | string | null
    frequency?: StringFilter<"RecurringTransaction"> | string
    dayOfMonth?: IntNullableFilter<"RecurringTransaction"> | number | null
    dayOfWeek?: IntNullableFilter<"RecurringTransaction"> | number | null
    isActive?: BoolFilter<"RecurringTransaction"> | boolean
    lastProcessed?: DateTimeNullableFilter<"RecurringTransaction"> | Date | string | null
    contactId?: StringNullableFilter<"RecurringTransaction"> | string | null
    createdAt?: DateTimeFilter<"RecurringTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"RecurringTransaction"> | Date | string
  }

  export type ContactCreateWithoutExpenseInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    invoices?: InvoiceCreateNestedManyWithoutCustomerInput
    Invoice_Invoice_supplierIdToContact?: InvoiceCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
    RecurringTransaction?: RecurringTransactionCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutExpenseInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutCustomerInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
    RecurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutExpenseInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
  }

  export type ContactUpsertWithoutExpenseInput = {
    update: XOR<ContactUpdateWithoutExpenseInput, ContactUncheckedUpdateWithoutExpenseInput>
    create: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutExpenseInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutExpenseInput, ContactUncheckedUpdateWithoutExpenseInput>
  }

  export type ContactUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutCustomerNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
    RecurringTransaction?: RecurringTransactionUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutCustomerNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
    RecurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutContactNestedInput
  }

  export type InvoiceCreateWithoutInvoiceFileInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    customer?: ContactCreateNestedOneWithoutInvoicesInput
    Contact_Invoice_supplierIdToContact?: ContactCreateNestedOneWithoutInvoice_Invoice_supplierIdToContactInput
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutInvoiceFileInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    customerId?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutInvoiceFileInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutInvoiceFileInput, InvoiceUncheckedCreateWithoutInvoiceFileInput>
  }

  export type InvoiceUpsertWithoutInvoiceFileInput = {
    update: XOR<InvoiceUpdateWithoutInvoiceFileInput, InvoiceUncheckedUpdateWithoutInvoiceFileInput>
    create: XOR<InvoiceCreateWithoutInvoiceFileInput, InvoiceUncheckedCreateWithoutInvoiceFileInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutInvoiceFileInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutInvoiceFileInput, InvoiceUncheckedUpdateWithoutInvoiceFileInput>
  }

  export type InvoiceUpdateWithoutInvoiceFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: ContactUpdateOneWithoutInvoicesNestedInput
    Contact_Invoice_supplierIdToContact?: ContactUpdateOneWithoutInvoice_Invoice_supplierIdToContactNestedInput
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutInvoiceFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type ContactCreateWithoutRecurringTransactionInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseCreateNestedManyWithoutContactInput
    invoices?: InvoiceCreateNestedManyWithoutCustomerInput
    Invoice_Invoice_supplierIdToContact?: InvoiceCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
  }

  export type ContactUncheckedCreateWithoutRecurringTransactionInput = {
    id: string
    name: string
    taxNumber?: string | null
    taxOffice?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    isCustomer?: boolean
    isSupplier?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Expense?: ExpenseUncheckedCreateNestedManyWithoutContactInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutCustomerInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedCreateNestedManyWithoutContact_Invoice_supplierIdToContactInput
  }

  export type ContactCreateOrConnectWithoutRecurringTransactionInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutRecurringTransactionInput, ContactUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type ContactUpsertWithoutRecurringTransactionInput = {
    update: XOR<ContactUpdateWithoutRecurringTransactionInput, ContactUncheckedUpdateWithoutRecurringTransactionInput>
    create: XOR<ContactCreateWithoutRecurringTransactionInput, ContactUncheckedCreateWithoutRecurringTransactionInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutRecurringTransactionInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutRecurringTransactionInput, ContactUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type ContactUpdateWithoutRecurringTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUpdateManyWithoutContactNestedInput
    invoices?: InvoiceUpdateManyWithoutCustomerNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutRecurringTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxNumber?: NullableStringFieldUpdateOperationsInput | string | null
    taxOffice?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isCustomer?: BoolFieldUpdateOperationsInput | boolean
    isSupplier?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Expense?: ExpenseUncheckedUpdateManyWithoutContactNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutCustomerNestedInput
    Invoice_Invoice_supplierIdToContact?: InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactNestedInput
  }

  export type SalaryPaymentCreateWithoutEmployeeInput = {
    id?: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bonusType?: BonusTypeCreateNestedOneWithoutPaymentsInput
  }

  export type SalaryPaymentUncheckedCreateWithoutEmployeeInput = {
    id?: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    bonusTypeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalaryPaymentCreateOrConnectWithoutEmployeeInput = {
    where: SalaryPaymentWhereUniqueInput
    create: XOR<SalaryPaymentCreateWithoutEmployeeInput, SalaryPaymentUncheckedCreateWithoutEmployeeInput>
  }

  export type SalaryPaymentCreateManyEmployeeInputEnvelope = {
    data: SalaryPaymentCreateManyEmployeeInput | SalaryPaymentCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type LeaveRequestCreateWithoutEmployeeInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    days: number
    type: $Enums.LeaveType
    status?: $Enums.LeaveStatus
    notes?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveRequestUncheckedCreateWithoutEmployeeInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    days: number
    type: $Enums.LeaveType
    status?: $Enums.LeaveStatus
    notes?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveRequestCreateOrConnectWithoutEmployeeInput = {
    where: LeaveRequestWhereUniqueInput
    create: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type LeaveRequestCreateManyEmployeeInputEnvelope = {
    data: LeaveRequestCreateManyEmployeeInput | LeaveRequestCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeDocumentCreateWithoutEmployeeInput = {
    id?: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    category?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeDocumentUncheckedCreateWithoutEmployeeInput = {
    id?: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    category?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeDocumentCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeDocumentWhereUniqueInput
    create: XOR<EmployeeDocumentCreateWithoutEmployeeInput, EmployeeDocumentUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeDocumentCreateManyEmployeeInputEnvelope = {
    data: EmployeeDocumentCreateManyEmployeeInput | EmployeeDocumentCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeLeaveBalanceCreateWithoutEmployeeInput = {
    id?: string
    year: number
    annualLeaveTotal?: number
    annualLeaveUsed?: number
    sickLeaveTotal?: number
    sickLeaveUsed?: number
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput = {
    id?: string
    year: number
    annualLeaveTotal?: number
    annualLeaveUsed?: number
    sickLeaveTotal?: number
    sickLeaveUsed?: number
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeLeaveBalanceCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeLeaveBalanceWhereUniqueInput
    create: XOR<EmployeeLeaveBalanceCreateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput>
  }

  export type SalaryPaymentUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: SalaryPaymentWhereUniqueInput
    update: XOR<SalaryPaymentUpdateWithoutEmployeeInput, SalaryPaymentUncheckedUpdateWithoutEmployeeInput>
    create: XOR<SalaryPaymentCreateWithoutEmployeeInput, SalaryPaymentUncheckedCreateWithoutEmployeeInput>
  }

  export type SalaryPaymentUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: SalaryPaymentWhereUniqueInput
    data: XOR<SalaryPaymentUpdateWithoutEmployeeInput, SalaryPaymentUncheckedUpdateWithoutEmployeeInput>
  }

  export type SalaryPaymentUpdateManyWithWhereWithoutEmployeeInput = {
    where: SalaryPaymentScalarWhereInput
    data: XOR<SalaryPaymentUpdateManyMutationInput, SalaryPaymentUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type SalaryPaymentScalarWhereInput = {
    AND?: SalaryPaymentScalarWhereInput | SalaryPaymentScalarWhereInput[]
    OR?: SalaryPaymentScalarWhereInput[]
    NOT?: SalaryPaymentScalarWhereInput | SalaryPaymentScalarWhereInput[]
    id?: StringFilter<"SalaryPayment"> | string
    employeeId?: StringFilter<"SalaryPayment"> | string
    paymentDate?: DateTimeFilter<"SalaryPayment"> | Date | string
    amount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFilter<"SalaryPayment"> | $Enums.SalaryPaymentType
    taxAmount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFilter<"SalaryPayment"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"SalaryPayment"> | string | null
    paymentMethod?: StringNullableFilter<"SalaryPayment"> | string | null
    status?: EnumPaymentStatusFilter<"SalaryPayment"> | $Enums.PaymentStatus
    bonusTypeId?: StringNullableFilter<"SalaryPayment"> | string | null
    createdAt?: DateTimeFilter<"SalaryPayment"> | Date | string
    updatedAt?: DateTimeFilter<"SalaryPayment"> | Date | string
  }

  export type LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: LeaveRequestWhereUniqueInput
    update: XOR<LeaveRequestUpdateWithoutEmployeeInput, LeaveRequestUncheckedUpdateWithoutEmployeeInput>
    create: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: LeaveRequestWhereUniqueInput
    data: XOR<LeaveRequestUpdateWithoutEmployeeInput, LeaveRequestUncheckedUpdateWithoutEmployeeInput>
  }

  export type LeaveRequestUpdateManyWithWhereWithoutEmployeeInput = {
    where: LeaveRequestScalarWhereInput
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type LeaveRequestScalarWhereInput = {
    AND?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
    OR?: LeaveRequestScalarWhereInput[]
    NOT?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
    id?: StringFilter<"LeaveRequest"> | string
    employeeId?: StringFilter<"LeaveRequest"> | string
    startDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    days?: IntFilter<"LeaveRequest"> | number
    type?: EnumLeaveTypeFilter<"LeaveRequest"> | $Enums.LeaveType
    status?: EnumLeaveStatusFilter<"LeaveRequest"> | $Enums.LeaveStatus
    notes?: StringNullableFilter<"LeaveRequest"> | string | null
    approvedAt?: DateTimeNullableFilter<"LeaveRequest"> | Date | string | null
    approvedBy?: StringNullableFilter<"LeaveRequest"> | string | null
    createdAt?: DateTimeFilter<"LeaveRequest"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveRequest"> | Date | string
  }

  export type EmployeeDocumentUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeDocumentWhereUniqueInput
    update: XOR<EmployeeDocumentUpdateWithoutEmployeeInput, EmployeeDocumentUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeDocumentCreateWithoutEmployeeInput, EmployeeDocumentUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeDocumentUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeDocumentWhereUniqueInput
    data: XOR<EmployeeDocumentUpdateWithoutEmployeeInput, EmployeeDocumentUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeDocumentUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeDocumentScalarWhereInput
    data: XOR<EmployeeDocumentUpdateManyMutationInput, EmployeeDocumentUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmployeeDocumentScalarWhereInput = {
    AND?: EmployeeDocumentScalarWhereInput | EmployeeDocumentScalarWhereInput[]
    OR?: EmployeeDocumentScalarWhereInput[]
    NOT?: EmployeeDocumentScalarWhereInput | EmployeeDocumentScalarWhereInput[]
    id?: StringFilter<"EmployeeDocument"> | string
    employeeId?: StringFilter<"EmployeeDocument"> | string
    title?: StringFilter<"EmployeeDocument"> | string
    fileKey?: StringFilter<"EmployeeDocument"> | string
    fileSize?: IntFilter<"EmployeeDocument"> | number
    mimeType?: StringFilter<"EmployeeDocument"> | string
    uploadDate?: DateTimeFilter<"EmployeeDocument"> | Date | string
    category?: StringFilter<"EmployeeDocument"> | string
    notes?: StringNullableFilter<"EmployeeDocument"> | string | null
    createdAt?: DateTimeFilter<"EmployeeDocument"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeDocument"> | Date | string
  }

  export type EmployeeLeaveBalanceUpsertWithoutEmployeeInput = {
    update: XOR<EmployeeLeaveBalanceUpdateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeLeaveBalanceCreateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedCreateWithoutEmployeeInput>
    where?: EmployeeLeaveBalanceWhereInput
  }

  export type EmployeeLeaveBalanceUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: EmployeeLeaveBalanceWhereInput
    data: XOR<EmployeeLeaveBalanceUpdateWithoutEmployeeInput, EmployeeLeaveBalanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeLeaveBalanceUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    annualLeaveTotal?: IntFieldUpdateOperationsInput | number
    annualLeaveUsed?: IntFieldUpdateOperationsInput | number
    sickLeaveTotal?: IntFieldUpdateOperationsInput | number
    sickLeaveUsed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLeaveBalanceUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    annualLeaveTotal?: IntFieldUpdateOperationsInput | number
    annualLeaveUsed?: IntFieldUpdateOperationsInput | number
    sickLeaveTotal?: IntFieldUpdateOperationsInput | number
    sickLeaveUsed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BonusTypeCreateWithoutPaymentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BonusTypeUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BonusTypeCreateOrConnectWithoutPaymentsInput = {
    where: BonusTypeWhereUniqueInput
    create: XOR<BonusTypeCreateWithoutPaymentsInput, BonusTypeUncheckedCreateWithoutPaymentsInput>
  }

  export type EmployeeCreateWithoutSalaryPaymentsInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutSalaryPaymentsInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentUncheckedCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutSalaryPaymentsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSalaryPaymentsInput, EmployeeUncheckedCreateWithoutSalaryPaymentsInput>
  }

  export type BonusTypeUpsertWithoutPaymentsInput = {
    update: XOR<BonusTypeUpdateWithoutPaymentsInput, BonusTypeUncheckedUpdateWithoutPaymentsInput>
    create: XOR<BonusTypeCreateWithoutPaymentsInput, BonusTypeUncheckedCreateWithoutPaymentsInput>
    where?: BonusTypeWhereInput
  }

  export type BonusTypeUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: BonusTypeWhereInput
    data: XOR<BonusTypeUpdateWithoutPaymentsInput, BonusTypeUncheckedUpdateWithoutPaymentsInput>
  }

  export type BonusTypeUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BonusTypeUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUpsertWithoutSalaryPaymentsInput = {
    update: XOR<EmployeeUpdateWithoutSalaryPaymentsInput, EmployeeUncheckedUpdateWithoutSalaryPaymentsInput>
    create: XOR<EmployeeCreateWithoutSalaryPaymentsInput, EmployeeUncheckedCreateWithoutSalaryPaymentsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutSalaryPaymentsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutSalaryPaymentsInput, EmployeeUncheckedUpdateWithoutSalaryPaymentsInput>
  }

  export type EmployeeUpdateWithoutSalaryPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSalaryPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutLeaveRequestsInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutLeaveRequestsInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentUncheckedCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentUncheckedCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutLeaveRequestsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
  }

  export type EmployeeUpsertWithoutLeaveRequestsInput = {
    update: XOR<EmployeeUpdateWithoutLeaveRequestsInput, EmployeeUncheckedUpdateWithoutLeaveRequestsInput>
    create: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutLeaveRequestsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutLeaveRequestsInput, EmployeeUncheckedUpdateWithoutLeaveRequestsInput>
  }

  export type EmployeeUpdateWithoutLeaveRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutLeaveRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUncheckedUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutDocumentsInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentCreateNestedManyWithoutEmployeeInput
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentUncheckedCreateNestedManyWithoutEmployeeInput
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutDocumentsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutDocumentsInput, EmployeeUncheckedCreateWithoutDocumentsInput>
  }

  export type EmployeeUpsertWithoutDocumentsInput = {
    update: XOR<EmployeeUpdateWithoutDocumentsInput, EmployeeUncheckedUpdateWithoutDocumentsInput>
    create: XOR<EmployeeCreateWithoutDocumentsInput, EmployeeUncheckedCreateWithoutDocumentsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutDocumentsInput, EmployeeUncheckedUpdateWithoutDocumentsInput>
  }

  export type EmployeeUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUpdateManyWithoutEmployeeNestedInput
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveBalance?: EmployeeLeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutLeaveBalanceInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentCreateNestedManyWithoutEmployeeInput
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutLeaveBalanceInput = {
    id?: string
    name: string
    position: string
    department: string
    startDate: Date | string
    email?: string | null
    phone?: string | null
    address?: string | null
    taxId?: string | null
    socialSecurityNumber?: string | null
    bankAccount?: string | null
    salary: Decimal | DecimalJsLike | number | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    salaryPayments?: SalaryPaymentUncheckedCreateNestedManyWithoutEmployeeInput
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    documents?: EmployeeDocumentUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutLeaveBalanceInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
  }

  export type EmployeeUpsertWithoutLeaveBalanceInput = {
    update: XOR<EmployeeUpdateWithoutLeaveBalanceInput, EmployeeUncheckedUpdateWithoutLeaveBalanceInput>
    create: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutLeaveBalanceInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutLeaveBalanceInput, EmployeeUncheckedUpdateWithoutLeaveBalanceInput>
  }

  export type EmployeeUpdateWithoutLeaveBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUpdateManyWithoutEmployeeNestedInput
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutLeaveBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    socialSecurityNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salaryPayments?: SalaryPaymentUncheckedUpdateManyWithoutEmployeeNestedInput
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    documents?: EmployeeDocumentUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type SalaryPaymentCreateWithoutBonusTypeInput = {
    id?: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutSalaryPaymentsInput
  }

  export type SalaryPaymentUncheckedCreateWithoutBonusTypeInput = {
    id?: string
    employeeId: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalaryPaymentCreateOrConnectWithoutBonusTypeInput = {
    where: SalaryPaymentWhereUniqueInput
    create: XOR<SalaryPaymentCreateWithoutBonusTypeInput, SalaryPaymentUncheckedCreateWithoutBonusTypeInput>
  }

  export type SalaryPaymentCreateManyBonusTypeInputEnvelope = {
    data: SalaryPaymentCreateManyBonusTypeInput | SalaryPaymentCreateManyBonusTypeInput[]
    skipDuplicates?: boolean
  }

  export type SalaryPaymentUpsertWithWhereUniqueWithoutBonusTypeInput = {
    where: SalaryPaymentWhereUniqueInput
    update: XOR<SalaryPaymentUpdateWithoutBonusTypeInput, SalaryPaymentUncheckedUpdateWithoutBonusTypeInput>
    create: XOR<SalaryPaymentCreateWithoutBonusTypeInput, SalaryPaymentUncheckedCreateWithoutBonusTypeInput>
  }

  export type SalaryPaymentUpdateWithWhereUniqueWithoutBonusTypeInput = {
    where: SalaryPaymentWhereUniqueInput
    data: XOR<SalaryPaymentUpdateWithoutBonusTypeInput, SalaryPaymentUncheckedUpdateWithoutBonusTypeInput>
  }

  export type SalaryPaymentUpdateManyWithWhereWithoutBonusTypeInput = {
    where: SalaryPaymentScalarWhereInput
    data: XOR<SalaryPaymentUpdateManyMutationInput, SalaryPaymentUncheckedUpdateManyWithoutBonusTypeInput>
  }

  export type InvoiceFileCreateManyInvoiceInput = {
    id: string
    filename: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceItemCreateManyInvoiceInput = {
    id?: string
    description: string
    quantity?: Decimal | DecimalJsLike | number | string
    unitPrice: Decimal | DecimalJsLike | number | string
    vatRate?: Decimal | DecimalJsLike | number | string
    vatAmount?: Decimal | DecimalJsLike | number | string
    totalAmount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceFileUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceFileUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceFileUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyContactInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    category: string
    paymentMethod: string
    status?: string
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceCreateManyCustomerInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    supplierId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
  }

  export type InvoiceCreateManyContact_Invoice_supplierIdToContactInput = {
    id?: string
    invoiceNumber: string
    invoiceDate?: Date | string | null
    dueDate?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    taxRate?: Decimal | DecimalJsLike | number | string | null
    taxAmount?: Decimal | DecimalJsLike | number | string | null
    totalAmount?: Decimal | DecimalJsLike | number | string
    isPaid?: boolean
    paymentDate?: Date | string | null
    status?: string
    type?: string | null
    notes?: string | null
    customerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    issuerAddress?: string | null
    issuerName?: string | null
    issuerTaxId?: string | null
    recipientAddress?: string | null
    recipientName?: string | null
    recipientTaxId?: string | null
  }

  export type RecurringTransactionCreateManyContactInput = {
    id: string
    title: string
    description?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: string
    category: string
    paymentMethod?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    frequency?: string
    dayOfMonth?: number | null
    dayOfWeek?: number | null
    isActive?: boolean
    lastProcessed?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type ExpenseUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    Contact_Invoice_supplierIdToContact?: ContactUpdateOneWithoutInvoice_Invoice_supplierIdToContactNestedInput
    InvoiceFile?: InvoiceFileUpdateManyWithoutInvoiceNestedInput
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    InvoiceFile?: InvoiceFileUncheckedUpdateManyWithoutInvoiceNestedInput
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvoiceUpdateWithoutContact_Invoice_supplierIdToContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: ContactUpdateOneWithoutInvoicesNestedInput
    InvoiceFile?: InvoiceFileUpdateManyWithoutInvoiceNestedInput
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutContact_Invoice_supplierIdToContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    InvoiceFile?: InvoiceFileUncheckedUpdateManyWithoutInvoiceNestedInput
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutContact_Invoice_supplierIdToContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    taxAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issuerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    issuerName?: NullableStringFieldUpdateOperationsInput | string | null
    issuerTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAddress?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientTaxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecurringTransactionUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurringTransactionUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    dayOfMonth?: NullableIntFieldUpdateOperationsInput | number | null
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastProcessed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentCreateManyEmployeeInput = {
    id?: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    bonusTypeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveRequestCreateManyEmployeeInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    days: number
    type: $Enums.LeaveType
    status?: $Enums.LeaveStatus
    notes?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeDocumentCreateManyEmployeeInput = {
    id?: string
    title: string
    fileKey: string
    fileSize: number
    mimeType: string
    uploadDate?: Date | string
    category?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalaryPaymentUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bonusType?: BonusTypeUpdateOneWithoutPaymentsNestedInput
  }

  export type SalaryPaymentUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bonusTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bonusTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: IntFieldUpdateOperationsInput | number
    type?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeDocumentUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeDocumentUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeDocumentUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentCreateManyBonusTypeInput = {
    id?: string
    employeeId: string
    paymentDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.SalaryPaymentType
    taxAmount?: Decimal | DecimalJsLike | number | string
    netAmount: Decimal | DecimalJsLike | number | string
    notes?: string | null
    paymentMethod?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalaryPaymentUpdateWithoutBonusTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutSalaryPaymentsNestedInput
  }

  export type SalaryPaymentUncheckedUpdateWithoutBonusTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalaryPaymentUncheckedUpdateManyWithoutBonusTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSalaryPaymentTypeFieldUpdateOperationsInput | $Enums.SalaryPaymentType
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}