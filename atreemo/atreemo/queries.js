// queries.js

const queries = {
    insertBookingsFact: `
      INSERT INTO bookingsfact(
        BookingsFactID, BookingID, CtcID, BookingDateTime, VistDateTime,
        StatusID, Status, Source, EstimatedValue, SiteID, SiteName, Covers, ModifiedDate
      ) VALUES ? ON DUPLICATE KEY UPDATE
        BookingsFactID = VALUES(BookingsFactID),
        CtcId = VALUES(CtcID),
        BookingDateTime = VALUES(BookingDateTime),
        VistDateTime = VALUES(VistDateTime),
        StatusID = VALUES(StatusID),
        Status = VALUES(Status),
        Source = VALUES(Source),
        EstimatedValue = VALUES(EstimatedValue),
        SiteID = VALUES(SiteID),
        SiteName = VALUES(SiteName),
        Covers = VALUES(Covers),
        ModifiedDate = VALUES(ModifiedDate);
    `,
    
    insertContactDetailsFact:`
    INSERT INTO contactdetailsfact(ContactDetailsFactID, CtcID, Gender, BirthDateYear, BirthdateMonth, PostCodeSector, FavouriteSiteID, FavouriteSite, CreateDate, SourceID, PointBalance, CorporateName, TiersName, Deleted, ModifiedDate) VALUES ?  
    ON DUPLICATE KEY UPDATE  
    ContactDetailsFactID = VALUES(ContactDetailsFactID),
    Gender = VALUES(Gender),  
    BirthDateYear = VALUES(BirthDateYear),  
    BirthdateMonth = VALUES(BirthdateMonth),  
    PostCodeSector = VALUES(PostCodeSector),  
    FavouriteSiteID = VALUES(FavouriteSiteID),  
    FavouriteSite = VALUES(FavouriteSite),  
    CreateDate = VALUES(CreateDate),  
    SourceID = VALUES(SourceID),  
    PointBalance = VALUES(PointBalance),  
    CorporateName = VALUES(CorporateName),  
    TiersName = VALUES(TiersName),  
    Deleted = VALUES(Deleted),  
    ModifiedDate = VALUES(ModifiedDate)
    `,
    insertTransactionsFact:`
    INSERT INTO transactionsfact(TransactionsFactID,CtcID, VoucherCode,SiteID,SiteName,OrderDate,TotalSpend,OrderType,OrderStatus,AmountPaid,DiscountAmount,SaleType,OrderID,OrderChannel,Source,PaidWithPoints,ModifiedDate,OrderUniqueID) VALUES ?  
        ON DUPLICATE KEY UPDATE    
        CtcID = VALUES(CtcID),  
        VoucherCode = VALUES(VoucherCode),  
        SiteID = VALUES(SiteID),  
        SiteName = VALUES(SiteName),  
        OrderDate = VALUES(OrderDate),  
        TotalSpend = VALUES(TotalSpend),  
        OrderType = VALUES(OrderType),  
        OrderStatus = VALUES(OrderStatus),  
        AmountPaid = VALUES(AmountPaid),  
        DiscountAmount = VALUES(DiscountAmount),  
        SaleType = VALUES(SaleType),  
        OrderID = VALUES(OrderID),  
        OrderChannel = VALUES(OrderChannel),  
        Source = VALUES(Source),  
        PaidWithPoints = VALUES(PaidWithPoints),  
        ModifiedDate = VALUES(ModifiedDate),  
        OrderUniqueID = VALUES(OrderUniqueID);
    `,
    insertContactPreferencesFact:`
    INSERT INTO contactpreferencesfact(ContactPreferencesFactID,CtcID,BrandName,Preferences,WebPushOptin,PushOptin,EmailOptin,MailOptin,PhoneOptin,SMSOptin,ModifiedDate) VALUES ?  
        ON DUPLICATE KEY UPDATE  
        ContactPreferencesFactID = VALUES(ContactPreferencesFactID),  
        CtcID = VALUES(CtcID),  
        BrandName = VALUES(BrandName),  
        Preferences = VALUES(Preferences),  
        WebPushOptin = VALUES(WebPushOptin),  
        PushOptin = VALUES(PushOptin),  
        EmailOptin = VALUES(EmailOptin),  
        MailOptin = VALUES(MailOptin),  
        PhoneOptin = VALUES(PhoneOptin),  
        SMSOptin = VALUES(SMSOptin),  
        ModifiedDate = VALUES(ModifiedDate);
    `,
    insertContactSourcesFact:`
    INSERT INTO contactsourcesfact (ContactsSourcesFactID,CtcID,SourceID,OriginID,BrandName, ModifiedDate) VALUES ?  
        ON DUPLICATE KEY UPDATE  
        ContactsSourcesFactID = VALUES(ContactsSourcesFactID),  
        CtcID = VALUES(CtcID),  
        SourceID = VALUES(SourceID),  
        OriginID = VALUES(OriginID),  
        BrandName = VALUES(BrandName),  
        ModifiedDate = VALUES(ModifiedDate);
    `,
    insertEmailTrendFact:`
    INSERT INTO emailtrendfact(EmailTrendFactID,CtcID,OpCode,PrjMkgTitle,Subject,CategoryID,Category,SendDate,OpenDate,TimeOfDayEmailOpened,DayOfWeekEmailOpened,SubmittedBy,SenderProfileID,SenderProfile,BrandName,DomainName,IsFollowUp,IsComplaint,Status,Error,FirstTrial,LastTrial,NbTrial,NbClicks,NbViews,Unsubscribe,CostPerItem,ModifiedDate) VALUES ? 
        ON DUPLICATE KEY UPDATE  
        EmailTrendFactID = VALUES(EmailTrendFactID),  
        CtcID = VALUES(CtcID),  
        OpCode = VALUES(OpCode),  
        PrjMkgTitle = VALUES(PrjMkgTitle),  
        Subject = VALUES(Subject),  
        CategoryID = VALUES(CategoryID),  
        Category = VALUES(Category),  
        OpenDate = VALUES(OpenDate),  
        TimeOfDayEmailOpened = VALUES(TimeOfDayEmailOpened),  
        DayOfWeekEmailOpened = VALUES(DayOfWeekEmailOpened),  
        SubmittedBy = VALUES(SubmittedBy),  
        SenderProfileID = VALUES(SenderProfileID),  
        SenderProfile = VALUES(SenderProfile),  
        BrandName = VALUES(BrandName),  
        DomainName = VALUES(DomainName),  
        IsFollowUp = VALUES(IsFollowUp),  
        IsComplaint = VALUES(IsComplaint),  
        Status = VALUES(Status),  
        Error = VALUES(Error),  
        FirstTrial = VALUES(FirstTrial),  
        LastTrial = VALUES(LastTrial),  
        NbTrial = VALUES(NbTrial),  
        NbClicks = VALUES(NbClicks),  
        NbViews = VALUES(NbViews),  
        Unsubscribe = VALUES(Unsubscribe),  
        CostPerItem = VALUES(CostPerItem),  
        ModifiedDate = VALUES(ModifiedDate);
    `,
    insertLoyaltyPointsFact:`
    INSERT INTO atreemo.loyaltypointsfact(LoyaltyPointsFactID,CtcID,OrderUniqueID,SiteID,SiteName,ActionDate,Points,Source,ModifiedDate) VALUES ? 
        ON DUPLICATE KEY UPDATE  
        LoyaltyPointsFactID = VALUES(LoyaltyPointsFactID),  
        CtcID = VALUES(CtcID),  
        OrderUniqueID = VALUES(OrderUniqueID),  
        SiteID = VALUES(SiteID),  
        SiteName = VALUES(SiteName),  
        ActionDate = VALUES(ActionDate),  
        Points = VALUES(Points),  
        Source = VALUES(Source),  
        ModifiedDate = VALUES(ModifiedDate);
    `,
    insertVisitsFact:`
    INSERT INTO visitsfact(VisitsFactID,CtcID,VisitDateTime,SiteID,SiteName,DirectSpent,IndirectSpent,Source,ModifiedDate) VALUES ? 
        ON DUPLICATE KEY UPDATE  
        VisitsFactID = VALUES(VisitsFactID),  
        CtcID = VALUES(CtcID),  
        VisitDateTime = VALUES(VisitDateTime),  
        SiteID = VALUES(SiteID),  
        SiteName = VALUES(SiteName),  
        DirectSpent = VALUES(DirectSpent),  
        IndirectSpent = VALUES(IndirectSpent),  
        Source = VALUES(Source),  
        ModifiedDate = VALUES(ModifiedDate);
    `,
      
};
  module.exports = {
    queries,
};
  