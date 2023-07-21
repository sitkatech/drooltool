//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[CustomRichTextType]
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using DroolTool.Models.DataTransferObjects;


namespace DroolTool.EFModels.Entities
{
    public abstract partial class CustomRichTextType
    {
        public static readonly CustomRichTextTypeAbout About = DroolTool.EFModels.Entities.CustomRichTextTypeAbout.Instance;
        public static readonly CustomRichTextTypeTakeAction TakeAction = DroolTool.EFModels.Entities.CustomRichTextTypeTakeAction.Instance;
        public static readonly CustomRichTextTypeHelp Help = DroolTool.EFModels.Entities.CustomRichTextTypeHelp.Instance;
        public static readonly CustomRichTextTypeProvideFeedback ProvideFeedback = DroolTool.EFModels.Entities.CustomRichTextTypeProvideFeedback.Instance;

        public static readonly List<CustomRichTextType> All;
        public static readonly List<CustomRichTextTypeDto> AllAsDto;
        public static readonly ReadOnlyDictionary<int, CustomRichTextType> AllLookupDictionary;
        public static readonly ReadOnlyDictionary<int, CustomRichTextTypeDto> AllAsDtoLookupDictionary;

        /// <summary>
        /// Static type constructor to coordinate static initialization order
        /// </summary>
        static CustomRichTextType()
        {
            All = new List<CustomRichTextType> { About, TakeAction, Help, ProvideFeedback };
            AllAsDto = new List<CustomRichTextTypeDto> { About.AsDto(), TakeAction.AsDto(), Help.AsDto(), ProvideFeedback.AsDto() };
            AllLookupDictionary = new ReadOnlyDictionary<int, CustomRichTextType>(All.ToDictionary(x => x.CustomRichTextTypeID));
            AllAsDtoLookupDictionary = new ReadOnlyDictionary<int, CustomRichTextTypeDto>(AllAsDto.ToDictionary(x => x.CustomRichTextTypeID));
        }

        /// <summary>
        /// Protected constructor only for use in instantiating the set of static lookup values that match database
        /// </summary>
        protected CustomRichTextType(int customRichTextTypeID, string customRichTextTypeName, string customRichTextTypeDisplayName)
        {
            CustomRichTextTypeID = customRichTextTypeID;
            CustomRichTextTypeName = customRichTextTypeName;
            CustomRichTextTypeDisplayName = customRichTextTypeDisplayName;
        }

        [Key]
        public int CustomRichTextTypeID { get; private set; }
        public string CustomRichTextTypeName { get; private set; }
        public string CustomRichTextTypeDisplayName { get; private set; }
        [NotMapped]
        public int PrimaryKey { get { return CustomRichTextTypeID; } }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public bool Equals(CustomRichTextType other)
        {
            if (other == null)
            {
                return false;
            }
            return other.CustomRichTextTypeID == CustomRichTextTypeID;
        }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public override bool Equals(object obj)
        {
            return Equals(obj as CustomRichTextType);
        }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public override int GetHashCode()
        {
            return CustomRichTextTypeID;
        }

        public static bool operator ==(CustomRichTextType left, CustomRichTextType right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(CustomRichTextType left, CustomRichTextType right)
        {
            return !Equals(left, right);
        }

        public CustomRichTextTypeEnum ToEnum => (CustomRichTextTypeEnum)GetHashCode();

        public static CustomRichTextType ToType(int enumValue)
        {
            return ToType((CustomRichTextTypeEnum)enumValue);
        }

        public static CustomRichTextType ToType(CustomRichTextTypeEnum enumValue)
        {
            switch (enumValue)
            {
                case CustomRichTextTypeEnum.About:
                    return About;
                case CustomRichTextTypeEnum.Help:
                    return Help;
                case CustomRichTextTypeEnum.ProvideFeedback:
                    return ProvideFeedback;
                case CustomRichTextTypeEnum.TakeAction:
                    return TakeAction;
                default:
                    throw new ArgumentException("Unable to map Enum: {enumValue}");
            }
        }
    }

    public enum CustomRichTextTypeEnum
    {
        About = 1,
        TakeAction = 2,
        Help = 3,
        ProvideFeedback = 4
    }

    public partial class CustomRichTextTypeAbout : CustomRichTextType
    {
        private CustomRichTextTypeAbout(int customRichTextTypeID, string customRichTextTypeName, string customRichTextTypeDisplayName) : base(customRichTextTypeID, customRichTextTypeName, customRichTextTypeDisplayName) {}
        public static readonly CustomRichTextTypeAbout Instance = new CustomRichTextTypeAbout(1, @"About", @"About");
    }

    public partial class CustomRichTextTypeTakeAction : CustomRichTextType
    {
        private CustomRichTextTypeTakeAction(int customRichTextTypeID, string customRichTextTypeName, string customRichTextTypeDisplayName) : base(customRichTextTypeID, customRichTextTypeName, customRichTextTypeDisplayName) {}
        public static readonly CustomRichTextTypeTakeAction Instance = new CustomRichTextTypeTakeAction(2, @"TakeAction", @"Take Action");
    }

    public partial class CustomRichTextTypeHelp : CustomRichTextType
    {
        private CustomRichTextTypeHelp(int customRichTextTypeID, string customRichTextTypeName, string customRichTextTypeDisplayName) : base(customRichTextTypeID, customRichTextTypeName, customRichTextTypeDisplayName) {}
        public static readonly CustomRichTextTypeHelp Instance = new CustomRichTextTypeHelp(3, @"Help", @"Help");
    }

    public partial class CustomRichTextTypeProvideFeedback : CustomRichTextType
    {
        private CustomRichTextTypeProvideFeedback(int customRichTextTypeID, string customRichTextTypeName, string customRichTextTypeDisplayName) : base(customRichTextTypeID, customRichTextTypeName, customRichTextTypeDisplayName) {}
        public static readonly CustomRichTextTypeProvideFeedback Instance = new CustomRichTextTypeProvideFeedback(4, @"ProvideFeedback", @"Provide Feedback");
    }
}