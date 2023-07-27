// import { Resolver, Query } from '@nestjs/graphql';
// import { Book } from './book.schema';
import { Book as BookModel } from 'src/graphql';

import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { AddBookArgs } from './args/add-book.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  // Queries and mutation
  @Query(() => [Book], { name: 'books' })
  getAllBooks(): BookModel[] {
    return this.bookService.findAllBooks();
  }

  @Query(() => Book, { name: 'findBookById', nullable: true })
  getBookById(
    @Args({ name: 'BookId', type: () => Int }) id: number,
  ): BookModel {
    return this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'deleteBookById' })
  deleteBookById(
    @Args({ name: 'BookId', type: () => Int }) id: number,
  ): string {
    return this.bookService.deleteBook(id);
  }

  @Mutation(() => String, { name: 'addBook' })
  addBook(@Args('addBookArgs') addBookArgs: AddBookArgs): string {
    return this.bookService.addBook(addBookArgs);
  }

  @Mutation(() => String, { name: 'updateBook' })
  updateBook(
    @Args({ name: 'bookId', type: () => Int }) id: number,
    @Args('addBookArgs') updateBookArgs: AddBookArgs,
  ): string {
    return this.bookService.updateBook(id, updateBookArgs);
  }
}
