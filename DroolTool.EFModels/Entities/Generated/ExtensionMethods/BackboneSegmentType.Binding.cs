//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[BackboneSegmentType]
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using DroolTool.Models.DataTransferObjects;


namespace DroolTool.EFModels.Entities
{
    public abstract partial class BackboneSegmentType
    {
        public static readonly BackboneSegmentTypeDummy Dummy = DroolTool.EFModels.Entities.BackboneSegmentTypeDummy.Instance;
        public static readonly BackboneSegmentTypeStormDrain StormDrain = DroolTool.EFModels.Entities.BackboneSegmentTypeStormDrain.Instance;
        public static readonly BackboneSegmentTypeChannel Channel = DroolTool.EFModels.Entities.BackboneSegmentTypeChannel.Instance;

        public static readonly List<BackboneSegmentType> All;
        public static readonly List<BackboneSegmentTypeDto> AllAsDto;
        public static readonly ReadOnlyDictionary<int, BackboneSegmentType> AllLookupDictionary;
        public static readonly ReadOnlyDictionary<int, BackboneSegmentTypeDto> AllAsDtoLookupDictionary;

        /// <summary>
        /// Static type constructor to coordinate static initialization order
        /// </summary>
        static BackboneSegmentType()
        {
            All = new List<BackboneSegmentType> { Dummy, StormDrain, Channel };
            AllAsDto = new List<BackboneSegmentTypeDto> { Dummy.AsDto(), StormDrain.AsDto(), Channel.AsDto() };
            AllLookupDictionary = new ReadOnlyDictionary<int, BackboneSegmentType>(All.ToDictionary(x => x.BackboneSegmentTypeID));
            AllAsDtoLookupDictionary = new ReadOnlyDictionary<int, BackboneSegmentTypeDto>(AllAsDto.ToDictionary(x => x.BackboneSegmentTypeID));
        }

        /// <summary>
        /// Protected constructor only for use in instantiating the set of static lookup values that match database
        /// </summary>
        protected BackboneSegmentType(int backboneSegmentTypeID, string backboneSegmentTypeName, string backboneSegmentTypeDisplayName)
        {
            BackboneSegmentTypeID = backboneSegmentTypeID;
            BackboneSegmentTypeName = backboneSegmentTypeName;
            BackboneSegmentTypeDisplayName = backboneSegmentTypeDisplayName;
        }

        [Key]
        public int BackboneSegmentTypeID { get; private set; }
        public string BackboneSegmentTypeName { get; private set; }
        public string BackboneSegmentTypeDisplayName { get; private set; }
        [NotMapped]
        public int PrimaryKey { get { return BackboneSegmentTypeID; } }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public bool Equals(BackboneSegmentType other)
        {
            if (other == null)
            {
                return false;
            }
            return other.BackboneSegmentTypeID == BackboneSegmentTypeID;
        }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public override bool Equals(object obj)
        {
            return Equals(obj as BackboneSegmentType);
        }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public override int GetHashCode()
        {
            return BackboneSegmentTypeID;
        }

        public static bool operator ==(BackboneSegmentType left, BackboneSegmentType right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(BackboneSegmentType left, BackboneSegmentType right)
        {
            return !Equals(left, right);
        }

        public BackboneSegmentTypeEnum ToEnum => (BackboneSegmentTypeEnum)GetHashCode();

        public static BackboneSegmentType ToType(int enumValue)
        {
            return ToType((BackboneSegmentTypeEnum)enumValue);
        }

        public static BackboneSegmentType ToType(BackboneSegmentTypeEnum enumValue)
        {
            switch (enumValue)
            {
                case BackboneSegmentTypeEnum.Channel:
                    return Channel;
                case BackboneSegmentTypeEnum.Dummy:
                    return Dummy;
                case BackboneSegmentTypeEnum.StormDrain:
                    return StormDrain;
                default:
                    throw new ArgumentException("Unable to map Enum: {enumValue}");
            }
        }
    }

    public enum BackboneSegmentTypeEnum
    {
        Dummy = 1,
        StormDrain = 2,
        Channel = 3
    }

    public partial class BackboneSegmentTypeDummy : BackboneSegmentType
    {
        private BackboneSegmentTypeDummy(int backboneSegmentTypeID, string backboneSegmentTypeName, string backboneSegmentTypeDisplayName) : base(backboneSegmentTypeID, backboneSegmentTypeName, backboneSegmentTypeDisplayName) {}
        public static readonly BackboneSegmentTypeDummy Instance = new BackboneSegmentTypeDummy(1, @"Dummy", @"Dummy");
    }

    public partial class BackboneSegmentTypeStormDrain : BackboneSegmentType
    {
        private BackboneSegmentTypeStormDrain(int backboneSegmentTypeID, string backboneSegmentTypeName, string backboneSegmentTypeDisplayName) : base(backboneSegmentTypeID, backboneSegmentTypeName, backboneSegmentTypeDisplayName) {}
        public static readonly BackboneSegmentTypeStormDrain Instance = new BackboneSegmentTypeStormDrain(2, @"StormDrain", @"Storm Drain");
    }

    public partial class BackboneSegmentTypeChannel : BackboneSegmentType
    {
        private BackboneSegmentTypeChannel(int backboneSegmentTypeID, string backboneSegmentTypeName, string backboneSegmentTypeDisplayName) : base(backboneSegmentTypeID, backboneSegmentTypeName, backboneSegmentTypeDisplayName) {}
        public static readonly BackboneSegmentTypeChannel Instance = new BackboneSegmentTypeChannel(3, @"Channel", @"Channel");
    }
}