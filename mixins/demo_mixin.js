

const annotationMixin = {
  data() {
    return {
      /*pageNumber: 0,
      docs: [{
        id: 1,
        text: 'Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.',
      },
        {
          id: 10,
          text: 'The White House is the official residence and workplace of the President of the United States. It is located at 1600 Pennsylvania Avenue NW in Washington, D.C. and has been the residence of every U.S. President since John Adams in 1800. The term is often used as a metonym for the president and his advisers.',
        },
        {
          id: 11,
          text: "The Democratic Party is one of the two major contemporary political parties in the United States, along with the Republican Party. Tracing its heritage back to Thomas Jefferson and James Madison's Democratic-Republican Party, the modern-day Democratic Party was founded around 1828 by supporters of Andrew Jackson, making it the world's oldest active political party.",
        },
        {
          id: 12,
          text: "Stanford University (officially Leland Stanford Junior University, colloquially the Farm) is a private research university in Stanford, California. Stanford is known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
        },
        {
          id: 13,
          text: 'Donald John Trump (born June 14, 1946) is the 45th and current President of the United States. Before entering politics, he was a businessman and television personality.',
        },
        {
          id: 14,
          text: "Silicon Valley (abbreviated as SV) is a region in the southern San Francisco Bay Area of Northern California, referring to the Santa Clara Valley, which serves as the global center for high technology, venture capital, innovation, and social media. San Jose is the Valley's largest city, the 3rd-largest in California, and the 10th-largest in the United States. Other major SV cities include Palo Alto, Santa Clara, Mountain View, and Sunnyvale. The San Jose Metropolitan Area has the third highest GDP per capita in the world (after Zurich, Switzerland and Oslo, Norway), according to the Brookings Institution.",
        },
      ],
      annotations: [
        [
          {
            id: 16,
            prob: 0.0,
            label: 1,
            start_offset: 0,
            end_offset: 23,
          },
          {
            id: 19,
            prob: 0.0,
            label: 2,
            start_offset: 121,
            end_offset: 138,
          },
          {
            id: 27,
            prob: 0.0,
            label: 2,
            start_offset: 321,
            end_offset: 329,
          },
          {
            id: 22,
            prob: 0.0,
            label: 3,
            start_offset: 199,
            end_offset: 215,
          },
          {
            id: 28,
            prob: 0.0,
            label: 3,
            start_offset: 350,
            end_offset: 371,
          },
          {
            id: 17,
            prob: 0.0,
            label: 5,
            start_offset: 30,
            end_offset: 44,
          },
          {
            id: 20,
            prob: 0.0,
            label: 5,
            start_offset: 144,
            end_offset: 160,
          },
          {
            id: 21,
            prob: 0.0,
            label: 5,
            start_offset: 165,
            end_offset: 181,
          },
          {
            id: 18,
            prob: 0.0,
            label: 6,
            start_offset: 52,
            end_offset: 60,
          },
          {
            id: 24,
            prob: 0.0,
            label: 6,
            start_offset: 234,
            end_offset: 250,
          },
          {
            id: 26,
            prob: 0.0,
            label: 6,
            start_offset: 294,
            end_offset: 315,
          },
        ],
        [],
        [],
        [],
        [],
        [],
      ],*/
    };
  },

  methods: {
    // nextPage() {
    //   this.pageNumber = Math.min(this.pageNumber + 1, this.docs.length - 1);
    // },
    //
    // prevPage() {
    //   this.pageNumber = Math.max(this.pageNumber - 1, 0);
    // },
    //
    // removeLabel(annotation) {
    //   const index = this.annotations[this.pageNumber].indexOf(annotation);
    //   this.annotations[this.pageNumber].splice(index, 1);
    // },

  },

};


export default annotationMixin;
