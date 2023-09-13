class ApiFeautres {

    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
        console.log('In constructor, queryStr--> ', this.queryStr)
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    searchByCategory() {
        const keyword = this.queryStr.category ? { category: this.queryStr.category } : {}
        this.query = this.query.find(keyword)
        return this;
    }

    searchByPrice() {
        let keyword = JSON.stringify({ price: this.queryStr.price })
        keyword = keyword.replace(/\b(gte|gt|lte|lt)\b/g, key => '$' + key);
        keyword = JSON.parse(keyword)
        this.query = this.query.find(keyword)
        return this;
    }

    pagination(resultPerPage) {
        let currentPage = this.queryStr.page
        const skip = resultPerPage * (currentPage - 1) // How many products to skip to get to that page
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this;
    }
}





module.exports = { ApiFeautres }