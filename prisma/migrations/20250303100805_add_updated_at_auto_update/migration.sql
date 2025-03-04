BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [DepartmentID] INT NOT NULL IDENTITY(1,1),
    [DepartmentName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED ([DepartmentID])
);

-- CreateTable
CREATE TABLE [dbo].[Employee] (
    [id] CHAR(8) NOT NULL CONSTRAINT [DF__Employee__id__76969D2E] DEFAULT 'substring(replace(CONVERT([varchar](36),newid()),''-'',''),(1),(8))',
    [EmployeeID] INT NOT NULL,
    [FirstName] VARCHAR(100) NOT NULL,
    [LastName] VARCHAR(100) NOT NULL,
    [Designation] VARCHAR(100),
    [DepartmentID] INT NOT NULL,
    [ManagerEmployeeID] INT,
    [IsAdmin] BIT NOT NULL CONSTRAINT [DF__Employee__IsAdmi__778AC167] DEFAULT 0,
    [CreatedAt] DATETIME2 CONSTRAINT [DF__Employee__Create__787EE5A0] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_Employee_EmployeeID] UNIQUE NONCLUSTERED ([EmployeeID])
);

-- CreateTable
CREATE TABLE [dbo].[JobDescription] (
    [JobDescriptionID] INT NOT NULL IDENTITY(1,1),
    [Role] VARCHAR(100) NOT NULL,
    [OpenPositions] INT NOT NULL CONSTRAINT [DF__JobDescri__OpenP__14270015] DEFAULT 1,
    [Experience] INT NOT NULL CONSTRAINT [DF__JobDescri__Exper__151B244E] DEFAULT 0,
    [JobTypeID] INT NOT NULL,
    [ModeOfWorkID] INT NOT NULL,
    [RequiredTechnicalSkills] NVARCHAR(max),
    [PreferredTechnicalSkills] NVARCHAR(max),
    [Location] VARCHAR(150),
    [EducationID] INT NOT NULL,
    [Responsibility] NVARCHAR(max),
    [Certifications] NVARCHAR(max),
    [NoticePeriodID] INT NOT NULL,
    [AdditionalReasons] NVARCHAR(max),
    CONSTRAINT [PK_JobDescription] PRIMARY KEY CLUSTERED ([JobDescriptionID])
);

-- CreateTable
CREATE TABLE [dbo].[Login] (
    [id] CHAR(8) NOT NULL CONSTRAINT [DF__Login__id__00200768] DEFAULT 'substring(replace(CONVERT([varchar](36),newid()),''-'',''),(1),(8))',
    [EmployeeID] INT NOT NULL,
    [Email] VARCHAR(150) NOT NULL,
    [PasswordHash] VARCHAR(255) NOT NULL,
    [Role] VARCHAR(20),
    [LastLogin] DATETIME2 CONSTRAINT [DF__Login__LastLogin__01142BA1] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_Login_EmployeeID] UNIQUE NONCLUSTERED ([EmployeeID]),
    CONSTRAINT [UQ_Login_Email] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[ResourceRequests] (
    [JobDescriptionID] INT NOT NULL,
    [EmployeeID] INT NOT NULL,
    [Status] VARCHAR(20) CONSTRAINT [DF_ResourceRequests_Status] DEFAULT 'InProgress',
    [CreatedAt] DATETIME2 CONSTRAINT [DF__ResourceR__Creat__46E78A0C] DEFAULT CURRENT_TIMESTAMP,
    [AcceptedAt] DATETIME2,
    [UpdatedAt] DATETIME2 CONSTRAINT [DF__ResourceR__Updat__47DBAE45] DEFAULT CURRENT_TIMESTAMP,
    [Feedback] NVARCHAR(max),
    [RequestTitle] VARCHAR(200) NOT NULL,
    [ResourceRequestID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__Resource__CAA45C94D5B7FC27] PRIMARY KEY CLUSTERED ([ResourceRequestID])
);

-- CreateTable
CREATE TABLE [dbo].[Skills] (
    [SkillID] INT NOT NULL IDENTITY(1,1),
    [SkillName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_Skills] PRIMARY KEY CLUSTERED ([SkillID])
);

-- CreateTable
CREATE TABLE [dbo].[UpdateTracker] (
    [UpdateTrackerID] INT NOT NULL IDENTITY(1,1),
    [EmployeeID] INT NOT NULL,
    [JobDescriptionID] INT NOT NULL,
    [ExpectedTimeline] VARCHAR(100),
    [Level1PanelID] INT,
    [Level1PanelInterviewSlots] NVARCHAR(max),
    [Level2PanelID] INT,
    [Level2PanelInterviewSlots] NVARCHAR(max),
    [Comments] NVARCHAR(max),
    [Status] VARCHAR(20) CONSTRAINT [DF_UpdateTracker_Status] DEFAULT 'InProgress',
    [LastUpdatedColumns] NVARCHAR(max),
    [CreatedAt] DATETIME2 CONSTRAINT [DF__UpdateTra__Creat__5441852A] DEFAULT CURRENT_TIMESTAMP,
    [DF__UpdateTra__Updat__5535A963] DATETIME2,
    [PriorityID] INT,
    [BudgetID] INT NOT NULL,
    CONSTRAINT [PK__UpdateTr__B89744B5E48E3273] PRIMARY KEY CLUSTERED ([UpdateTrackerID])
);

-- CreateTable
CREATE TABLE [dbo].[Education] (
    [EducationID] INT NOT NULL IDENTITY(1,1),
    [EducationName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_Education] PRIMARY KEY CLUSTERED ([EducationID])
);

-- CreateTable
CREATE TABLE [dbo].[InterviewSlots] (
    [InterviewSlotID] INT NOT NULL IDENTITY(1,1),
    [InterviewSlotName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_InterviewSlots] PRIMARY KEY CLUSTERED ([InterviewSlotID])
);

-- CreateTable
CREATE TABLE [dbo].[JobType] (
    [JobTypeID] INT NOT NULL IDENTITY(1,1),
    [JobTypeName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_JobType] PRIMARY KEY CLUSTERED ([JobTypeID])
);

-- CreateTable
CREATE TABLE [dbo].[ModeOfWork] (
    [ModeOfWorkID] INT NOT NULL IDENTITY(1,1),
    [ModeOfWorkName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_ModeOfWork] PRIMARY KEY CLUSTERED ([ModeOfWorkID])
);

-- CreateTable
CREATE TABLE [dbo].[NoticePeriod] (
    [NoticePeriodID] INT NOT NULL IDENTITY(1,1),
    [NoticePeriodName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_NoticePeriod] PRIMARY KEY CLUSTERED ([NoticePeriodID])
);

-- CreateTable
CREATE TABLE [dbo].[Priority] (
    [PriorityID] INT NOT NULL IDENTITY(1,1),
    [PriorityName] VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_Priority] PRIMARY KEY CLUSTERED ([PriorityID])
);

-- CreateTable
CREATE TABLE [dbo].[BudgetRanges] (
    [BudgetID] INT NOT NULL IDENTITY(1,1),
    [BudgetName] NVARCHAR(255) NOT NULL,
    CONSTRAINT [PK__BudgetRa__E38E79C47C1ECA2F] PRIMARY KEY CLUSTERED ([BudgetID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Employee] ADD CONSTRAINT [FK__Employee__Depart__3B75D760] FOREIGN KEY ([DepartmentID]) REFERENCES [dbo].[Department]([DepartmentID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Employee] ADD CONSTRAINT [FK__Employee__Manage__3C69FB99] FOREIGN KEY ([ManagerEmployeeID]) REFERENCES [dbo].[Employee]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[JobDescription] ADD CONSTRAINT [FK_JobDescription_Education] FOREIGN KEY ([EducationID]) REFERENCES [dbo].[Education]([EducationID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[JobDescription] ADD CONSTRAINT [FK_JobDescription_JobType] FOREIGN KEY ([JobTypeID]) REFERENCES [dbo].[JobType]([JobTypeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[JobDescription] ADD CONSTRAINT [FK_JobDescription_ModeOfWork] FOREIGN KEY ([ModeOfWorkID]) REFERENCES [dbo].[ModeOfWork]([ModeOfWorkID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[JobDescription] ADD CONSTRAINT [FK_JobDescription_NoticePeriod] FOREIGN KEY ([NoticePeriodID]) REFERENCES [dbo].[NoticePeriod]([NoticePeriodID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Login] ADD CONSTRAINT [FK__Login__EmployeeI__4F7CD00D] FOREIGN KEY ([EmployeeID]) REFERENCES [dbo].[Employee]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ResourceRequests] ADD CONSTRAINT [FK_ResourceRequests_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [dbo].[Employee]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ResourceRequests] ADD CONSTRAINT [FK_ResourceRequests_JobDescription] FOREIGN KEY ([JobDescriptionID]) REFERENCES [dbo].[JobDescription]([JobDescriptionID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UpdateTracker] ADD CONSTRAINT [FK_UpdateTra_Budget] FOREIGN KEY ([BudgetID]) REFERENCES [dbo].[BudgetRanges]([BudgetID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UpdateTracker] ADD CONSTRAINT [FK__UpdateTra__Emplo__571DF1D5] FOREIGN KEY ([EmployeeID]) REFERENCES [dbo].[Employee]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UpdateTracker] ADD CONSTRAINT [FK__UpdateTra__Level__5812160E] FOREIGN KEY ([Level1PanelID]) REFERENCES [dbo].[Employee]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UpdateTracker] ADD CONSTRAINT [FK__UpdateTra__Level__59063A47] FOREIGN KEY ([Level2PanelID]) REFERENCES [dbo].[Employee]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UpdateTracker] ADD CONSTRAINT [FK_UpdateTra_Priority] FOREIGN KEY ([PriorityID]) REFERENCES [dbo].[Priority]([PriorityID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
