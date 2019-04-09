﻿// <auto-generated />
using CAHgame.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CAHgame.Migrations
{
    [DbContext(typeof(CardDbContext))]
    [Migration("20190409151941_AddNumCardsColumn")]
    partial class AddNumCardsColumn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity("CAHgame.Models.Card", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<int>("NumCards");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("cards");
                });
#pragma warning restore 612, 618
        }
    }
}