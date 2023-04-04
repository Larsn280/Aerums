using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aerums_API.Data.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_BookingModel_BookingModelBookingsId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_FreeTimeModel_FreeTimeModelFreeTimeId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_BookingModelBookingsId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_FreeTimeModelFreeTimeId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsConfirmedAttendingUser",
                table: "BookingModel");

            migrationBuilder.DropColumn(
                name: "BookingModelBookingsId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FreeTimeModelFreeTimeId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "IsConfirmedHostingUser",
                table: "BookingModel",
                newName: "IsConfirmed");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUser",
                table: "FreeTimeModel",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUser",
                table: "BookingModel",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FreeTimeModel_ApplicationUser",
                table: "FreeTimeModel",
                column: "ApplicationUser");

            migrationBuilder.CreateIndex(
                name: "IX_BookingModel_ApplicationUser",
                table: "BookingModel",
                column: "ApplicationUser");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingModel_AspNetUsers_ApplicationUser",
                table: "BookingModel",
                column: "ApplicationUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FreeTimeModel_AspNetUsers_ApplicationUser",
                table: "FreeTimeModel",
                column: "ApplicationUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingModel_AspNetUsers_ApplicationUser",
                table: "BookingModel");

            migrationBuilder.DropForeignKey(
                name: "FK_FreeTimeModel_AspNetUsers_ApplicationUser",
                table: "FreeTimeModel");

            migrationBuilder.DropIndex(
                name: "IX_FreeTimeModel_ApplicationUser",
                table: "FreeTimeModel");

            migrationBuilder.DropIndex(
                name: "IX_BookingModel_ApplicationUser",
                table: "BookingModel");

            migrationBuilder.DropColumn(
                name: "ApplicationUser",
                table: "FreeTimeModel");

            migrationBuilder.DropColumn(
                name: "ApplicationUser",
                table: "BookingModel");

            migrationBuilder.RenameColumn(
                name: "IsConfirmed",
                table: "BookingModel",
                newName: "IsConfirmedHostingUser");

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmedAttendingUser",
                table: "BookingModel",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "BookingModelBookingsId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FreeTimeModelFreeTimeId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_BookingModelBookingsId",
                table: "AspNetUsers",
                column: "BookingModelBookingsId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_FreeTimeModelFreeTimeId",
                table: "AspNetUsers",
                column: "FreeTimeModelFreeTimeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_BookingModel_BookingModelBookingsId",
                table: "AspNetUsers",
                column: "BookingModelBookingsId",
                principalTable: "BookingModel",
                principalColumn: "BookingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_FreeTimeModel_FreeTimeModelFreeTimeId",
                table: "AspNetUsers",
                column: "FreeTimeModelFreeTimeId",
                principalTable: "FreeTimeModel",
                principalColumn: "FreeTimeId");
        }
    }
}
