create table Notification_tbl
(NotificationCode int primary key identity(1,1) ,
[Type] varchar(100),
Symbol varchar(40),
[Date] date,
[High] FLOAT,
[Low] FLOAT,
[Open] FLOAT,
[Close] FLOAT,
[Volume] FLOAT
)
