using forgeboard.api.Models;
using Microsoft.EntityFrameworkCore;

namespace forgeboard.api.Data
{
    public class ForgeBoardDbContext : DbContext
    {
        public ForgeBoardDbContext(DbContextOptions<ForgeBoardDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Company> Companies => Set<Company>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<ProjectPriority> ProjectPriorities => Set<ProjectPriority>();
        public DbSet<Ticket> Tickets => Set<Ticket>();
        public DbSet<TicketType> TicketTypes => Set<TicketType>();
        public DbSet<TicketStatus> TicketStatuses => Set<TicketStatus>();
        public DbSet<TicketPriority> TicketPriorities => Set<TicketPriority>();
        public DbSet<TicketComment> TicketComments => Set<TicketComment>();
        public DbSet<TicketAttachment> TicketAttachments => Set<TicketAttachment>();
        public DbSet<TicketHistory> TicketHistories => Set<TicketHistory>();
        public DbSet<Invite> Invites => Set<Invite>();
        public DbSet<Notification> Notifications => Set<Notification>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasOne(u => u.Company)
                    .WithMany(c => c.Members)
                    .HasForeignKey(u => u.CompanyId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<User>()
                .HasMany(u => u.Projects)
                .WithMany(p => p.Members);

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasOne(p => p.Company)
                    .WithMany(c => c.Projects)
                    .HasForeignKey(p => p.CompanyId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(p => p.ProjectPriority)
                    .WithMany()
                    .HasForeignKey(p => p.ProjectPriorityId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.HasOne(t => t.Project)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(t => t.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.TicketType)
                    .WithMany()
                    .HasForeignKey(t => t.TicketTypeId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.TicketPriority)
                    .WithMany()
                    .HasForeignKey(t => t.TicketPriorityId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.TicketStatus)
                    .WithMany()
                    .HasForeignKey(t => t.TicketStatusId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.OwnerUser)
                    .WithMany()
                    .HasForeignKey(t => t.OwnerUserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.DeveloperUser)
                    .WithMany()
                    .HasForeignKey(t => t.DeveloperUserId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<TicketComment>(entity =>
            {
                entity.HasOne(c => c.Ticket)
                    .WithMany(t => t.Comments)
                    .HasForeignKey(c => c.TicketId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(c => c.User)
                    .WithMany()
                    .HasForeignKey(c => c.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<TicketAttachment>(entity =>
            {
                entity.HasOne(a => a.Ticket)
                    .WithMany(t => t.Attachments)
                    .HasForeignKey(a => a.TicketId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(a => a.User)
                    .WithMany()
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<TicketHistory>(entity =>
            {
                entity.HasOne(h => h.Ticket)
                    .WithMany(t => t.History)
                    .HasForeignKey(h => h.TicketId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(h => h.User)
                    .WithMany()
                    .HasForeignKey(h => h.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Invite>(entity =>
            {
                entity.HasOne(i => i.Company)
                    .WithMany(c => c.Invites)
                    .HasForeignKey(i => i.CompanyId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(i => i.Project)
                    .WithMany()
                    .HasForeignKey(i => i.ProjectId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(i => i.Invitor)
                    .WithMany()
                    .HasForeignKey(i => i.InvitorId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(i => i.Invitee)
                    .WithMany()
                    .HasForeignKey(i => i.InviteeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasOne(n => n.Ticket)
                    .WithMany(t => t.Notifications)
                    .HasForeignKey(n => n.TicketId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(n => n.Sender)
                    .WithMany()
                    .HasForeignKey(n => n.SenderId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(n => n.Recipient)
                    .WithMany()
                    .HasForeignKey(n => n.RecipientId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
